import React, { useContext, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { RowBetween } from 'components/Row'
import { ChartArea, Price } from './styleds'
import { DetailDescription, Percent, PriceArea, ContractAddress } from '../styleds'

interface GraphProps {
  coin: string
  token: string
}

function Graph({ coin, token } : GraphProps) {
  const [priceData, setPriceData] = useState([])
  const [price, setPrice] = useState(0)
  const [percent, setPercent] = useState(0)
  const [increase, setIncrease] = useState(true)
  const [infoColor, setInfoColor] = useState('#56e19f')

  const TokenAddress = {
    L2L: '0x11f6ecc9e2658627e0876212f1078b9f84d3196e',
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BETH: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
    ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  }

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

  console.log("pooh, TokenAddress = ", TokenAddress)

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
