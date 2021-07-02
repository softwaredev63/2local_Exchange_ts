import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartArea, Price } from './styleds'

const data = [
  {
    name: 'Mon.',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tue.',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wed.',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thu.',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Fri.',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat.',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sun.',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

function Graph() {
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

  return (
    <ChartArea>
      <Price>Price (USD)</Price>
      <AreaChart width={1120} height={200} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
        <XAxis fontSize="12px" padding={{ left: 30 }} axisLine={false} tickLine={false} dataKey="name" />
        <YAxis fontSize="12px" tickFormatter={DataFormater} axisLine={false} tickLine={false} />
        <Tooltip />

        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ChartArea>
  )
}

export default Graph
