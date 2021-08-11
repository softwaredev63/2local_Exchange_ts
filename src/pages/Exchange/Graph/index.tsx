import React, { useContext, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { RowBetween } from 'components/Row'
import { ChartArea, Price } from './styleds'
import { DetailDescription, Percent, PriceArea, ContractAddress } from '../styleds'

function Graph() {
  const [priceData, setPriceData] = useState([])
  const [price, setPrice] = useState(0)
  const [percent, setPercent] = useState(0)
  const [increase, setIncrease] = useState(true)
  const [infoColor, setInfoColor] = useState('#56e19f')

  const EpochToDate = (epoch: number) => {
    if (epoch < 10000000000) epoch *= 1000
    const time = epoch + new Date().getTimezoneOffset() * -1
    const dateString = new Date(time).toString()
    return dateString.substring(4, 11)
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
    .then((response) => response.json())
    .then((responseData) => {
      setPriceData(responseData)
      setPrice(responseData[responseData.length - 1].price.toFixed(5))
      const priceChangePercent =
        (responseData[responseData.length - 1].price / responseData[responseData.length - 4].price - 1) * 100
      setPercent(Math.abs(priceChangePercent))
      if (priceChangePercent > 0) {
        setIncrease(true)
        setInfoColor('#56e19f')
      } else {
        setIncrease(false)
        setInfoColor('#e15656')
      }
    })

  return (
    <ChartArea>
      <RowBetween>
        <DetailDescription>
          <Text fontSize="18px">1 2LC : {price} USD &nbsp;</Text>
          <PriceArea>
            <FontAwesomeIcon icon={increase ? faArrowUp : faArrowDown} color={infoColor} />
            <Percent fontSize="18px" color={infoColor}>
              {percent.toFixed(2)}%
            </Percent>
          </PriceArea>
        </DetailDescription>
        <ContractAddress>0x11f6ecc9e2658627e0876212f1078b9f84d3196e</ContractAddress>
      </RowBetween>
      <Price>Price (USD)</Price>
      <AreaChart width={1120} height={200} data={priceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
        <XAxis
          fontSize="12px"
          tickFormatter={EpochToDate}
          axisLine={false}
          tickLine={false}
          dataKey="time"
          padding={{ left: 30 }}
        />
        <YAxis fontSize="12px" tickFormatter={DataFormater} axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ChartArea>
  )
}

export default Graph
