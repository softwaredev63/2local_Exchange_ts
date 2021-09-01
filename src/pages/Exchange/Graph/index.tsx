import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { RowBetween } from 'components/Row'
import { ChartArea, Price } from './styleds'
import useInterval from '../../../hooks/useInterval'
import { DetailDescription, Percent, PriceArea, ContractAddress } from '../styleds'

interface GraphProps {
  coin: string
  token: string
}

interface PriceDataProps {
  date: string | undefined
  price_2lc: string | undefined
  price_eth: string | undefined
  price_cake: string | undefined
  price_uni: string | undefined
  price_btcb: string | undefined
}

function Graph({ coin, token } : GraphProps) {

  console.log("token = ", token)
  const [during, setDuring] = useState(0)
  const [priceData, setPriceData] = useState<PriceDataProps[]>([])
  const [price, setPrice] = useState(0)
  const [percent, setPercent] = useState(0)
  const [increase, setIncrease] = useState(true)
  const [infoColor, setInfoColor] = useState('#56e19f')
  const [currentTokenAddress, setCurrentTokenAddress] = useState('0x11f6ecc9e2658627e0876212f1078b9f84d3196e')
  const [chartKey, setChartKey] = useState('price_2lc')

  useEffect(() => {
    let tokenAddress = ''
    const TokenAddress = {
      L2L: '0x11f6ecc9e2658627e0876212f1078b9f84d3196e',
      ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      UNI: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
      BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    }

    fetch('https://exchangeapi.2local.io/getPriceData')
      .then((response) => response.json())
      .then((responseData) => {
        setPriceData(responseData)
      })

    switch(token) {
      case '2LC':
         tokenAddress = TokenAddress.L2L
         setChartKey('price_2lc')
         break
      case 'ETH':
        tokenAddress =  TokenAddress.ETH
        const data: PriceDataProps = priceData[priceData.length - 1]
        setChartKey('price_eth')
        break
      case 'CAKE':
        tokenAddress =  TokenAddress.CAKE
        setChartKey('price_cake')
        break
      case 'UNI':
        tokenAddress =  TokenAddress.UNI
        setChartKey('price_uni')
        break
      case 'BTCB':
        tokenAddress =  TokenAddress.BTCB
        setChartKey('price_btcb')
        break
    }
    setCurrentTokenAddress(tokenAddress)
  }, [ token, priceData ])

  useEffect(() => {
    let tokenString = token
    if (token === 'BTCB') tokenString = 'BTC'

    const percentUrl = 'https://www.bitrue.com/api/v1/ticker/24hr?symbol='.concat(tokenString).concat('USDT')
    fetch(percentUrl)
      .then((response) => response.json())
      .then((responseData) => {        
        if (responseData) {
          const data24h = responseData[0]
          console.log("pooh, data24h = ", data24h)          
          if (data24h) {
            setPrice(data24h.lastPrice)
            setPercent(Math.abs(data24h.priceChange))
            if (data24h.priceChange > 0) {
              setIncrease(true)
              setInfoColor('#56e19f')
            } else {
              setIncrease(false)
              setInfoColor('#e15656')
            }
          }
        }
      })
  }, [ token ])

  // useInterval(updatePriceChartChange, 240000)
  // useInterval(updatePriceChange, 60000)

  const EpochToDate = (date: string) => {
    const time = date.toString()
    return time.substring(5, 10)
  }

  const DataFormater = (data: string) => {
    return data
  }

  return (
    <ChartArea>
      <RowBetween>
        <DetailDescription>
          <Text fontSize="18px">1 {token} : {price} USD &nbsp;</Text>
          <PriceArea>
            <FontAwesomeIcon icon={increase ? faArrowUp : faArrowDown} color={infoColor} />
            <Percent fontSize="18px" color={infoColor}>
              {percent}%
            </Percent>
          </PriceArea>
        </DetailDescription>
        <ContractAddress>{currentTokenAddress}</ContractAddress>
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
          dataKey="date"
          padding={{ left: 30 }}
        />
        <YAxis fontSize="12px" tickFormatter={DataFormater} axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey={chartKey} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart> 
    </ChartArea>
  )
}

export default Graph
