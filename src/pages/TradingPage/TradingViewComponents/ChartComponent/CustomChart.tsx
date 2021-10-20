import React, { useEffect } from "react";
import { createChart, isBusinessDay } from 'lightweight-charts';
import socketIOClient from "socket.io-client";
import { API_BASE_URL } from '../../../../connectors/api'

function CustomChart() {

  const ref: any = React.useRef();

  useEffect(() => {

    const chart = createChart(ref.current, {
      width: 1000,
      height: 300,
      rightPriceScale: {
        scaleMargins: {
          top: 0.48,
          bottom: 0.48,
        },
      },

      localization: {
        // timeFormatter: businessDayOrTimestamp => {
        //   if (isBusinessDay(businessDayOrTimestamp)) {
        //     return 'bd=' + businessDayOrTimestamp.day + '-' + businessDayOrTimestamp.month + '-' + businessDayOrTimestamp.year;
        //   }

        //   return 'ts=' + businessDayOrTimestamp;
        // },
      },
    });

    chart.applyOptions({
      grid: {
        vertLines: {
          color: 'rgba(0, 0, 0, 0.1)',
          style: 1,
          visible: true,
        },
        horzLines: {
          color: 'rgba(0, 0, 0, 0.1)',
          style: 1,
          visible: true,
        },
      },

      timeScale: {
        tickMarkFormatter: (time) => {

          const monthTitle = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const date = new Date(time * 1000);
          // const years = date.getFullYear();
          const months = date.getMonth();
          const days = date.getDate().toString().padStart(2, '0');
          // Hours part from the timestamp
          const hours = date.getHours();
          // Minutes part from the timestamp
          const minutes = "0" + date.getMinutes();
          // Seconds part from the timestamp

          // Will display time in 10:30:23 format
          const formattedTime = days + ' ' + monthTitle[months] + ' ' + hours + ':' + minutes.substr(-2);

          const year = isBusinessDay(time) ? time.year : formattedTime;
          return String(year);
        },
      },
    });


    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(36,152,243, 0.2)',
      bottomColor: 'rgba(36,152,243, 0)',
      lineColor: 'rgba(36,152,243, 1)',
      lineWidth: 2,
      title: '2LCTBUSD',
    });

    areaSeries.applyOptions({
      priceFormat: {
        type: 'custom',
        minMove: 0.00000001,
        formatter: price => parseFloat(price).toFixed(8),
      },
    });

    let cnt = 0;
    const period = 8;
    fetch(`${API_BASE_URL}/getInitChartData?period=${period}`)
      .then(res => res.json())
      .then(json => {
        areaSeries.setData(json);

        chart.timeScale().fitContent();

        const socket = socketIOClient(`${API_BASE_URL}`);
        socket.on("FromAPI", data => {

          data.time = Date.parse(data.time) / 1000;

          cnt = (cnt + 1) % 60;
          if (cnt === 0) {
            areaSeries.update(data);
          }
        });
      }).catch(error => {
        console.error(error);
      });
  }, []);

  return (

    <div>
      <div className="container">
        <div ref={ref} />
      </div>
    </div>
  );
}

export default CustomChart;
