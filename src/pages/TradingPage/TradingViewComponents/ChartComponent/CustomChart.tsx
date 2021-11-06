import React, { useEffect, useRef } from "react";
import { createChart, isBusinessDay } from 'lightweight-charts';
import socketIOClient from "socket.io-client";
import { useResizeDetector } from 'react-resize-detector';
import { API_BASE_URL, SOCKET_BASE_URL } from '../../../../connectors/api'
function CustomChart() {
  const { width, ref } = useResizeDetector();

  const chartRef = useRef<any>();


  useEffect(() => {
    const chart = createChart(ref.current, {
      width: width,
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
        formatter: price => price.toFixed(8),
      },
    });

    const period = 8;
    fetch(`${API_BASE_URL}/trading/2lct-price-data?period=${period}`)
      .then(res => res.json())
      .then(json => {
        areaSeries.setData(json);

        chart.timeScale().fitContent();

        const socket = socketIOClient(`${SOCKET_BASE_URL}`);
        socket.on("2lct-current-price", data => {
          areaSeries.update(data);
        });
      }).catch(error => {
        console.error(error);
      });

    chartRef.current = chart;
  }, []);

  // useEffect(() => {
  //   const chart = chartRef.current;
  //   if (chart) chart.applyOptions({ width });
  // }, [width])
  return (
    <div>
      <div ref={ref} />
    </div>
  );
}

export default CustomChart;
