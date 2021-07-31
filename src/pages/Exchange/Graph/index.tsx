import React, { useContext, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartArea, Price } from './styleds'

function Graph() {
  const [priceData, setPriceData] = useState([])

  const EpochToDate = (epoch: number) => {
    if (epoch < 10000000000)
      epoch *= 1000;
    const time = epoch + (new Date().getTimezoneOffset() * -1);
    const dateString = new Date(time).toString();
    return dateString.substring(4, 11);
  }

  const DataFormater = (number: number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString().concat('B')
    }
    if (number > 1000000) {
      return (number / 1000000).toString().concat('M')
    }
    if (number > 1000) {
      return (number / 1000).toString().concat('K')
    }
    return number.toString()
  }

  fetch('https://dcrypto.io/api/chart_data?period=week&symbol=2LCUSDT')
  .then(response => response.json())
  .then(responseData => {
    setPriceData(responseData);
    console.log("pooh responseData = ", responseData);
  });

  return (
    <ChartArea>
      <Price>Price (USD)</Price>
      <AreaChart width={1480} height={200} data={priceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#43A3DE" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#43A3DE" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis fontSize="12px" tickFormatter={EpochToDate} axisLine={false} tickLine={false} dataKey="time" />
        <YAxis fontSize="12px" tickFormatter={DataFormater} axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ChartArea>
  )
}

export default Graph
