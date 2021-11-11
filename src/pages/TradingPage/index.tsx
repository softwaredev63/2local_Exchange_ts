import React, {useState, useEffect} from 'react'
import {  Text } from '@pancakeswap-libs/uikit'
import macd1 from 'macd';
import { CenterLayout, Layout, LeftLayout } from './styleds'
import AddRetrieve from './AddRetrieve'
import TradingTable from './TradingTable'
import IntroducePanel from './IntroducePanel'
import GraphPanel from './GraphPanel'

const CANDLE_LIMIT = 50;
export default function TradingPage() {

  const [macd, setMacd] = useState({
    '1d': 0,
    '8h': 0,
    '4h': 0,
    '1h': 0,
    '15m': 0,
    '1m': 0,
  });
  const [histogram, setHistogram] = useState({
    '1d': 0,
    '8h': 0,
    '4h': 0,
    '1h': 0,
    '15m': 0,
    '1m': 0,
  });

  const updateMACDValues = (interval) => {
    fetch(`https://api.binance.com/api/v1/klines?symbol=BTCBUSD&interval=${interval}&limit=${CANDLE_LIMIT}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      const prices = res.map(candle => parseFloat(candle[4]));

      const macdVal = macd1(prices, 6, 3, 9).MACD[CANDLE_LIMIT - 1];
      macd[interval] = macdVal; 
      setMacd({...macd});
      
      const histogramVal = macd1(prices, 6, 3, 9).histogram[CANDLE_LIMIT - 1];
      histogram[interval] = histogramVal; 
      setHistogram({...histogram});
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateMACDValues('1d');
      updateMACDValues('4h');
      updateMACDValues('1h');
      updateMACDValues('15m');
      updateMACDValues('1m');
    }, 1000);
    return () => clearInterval(interval);
  }, [macd, histogram])
  
  return (
    <Layout>
      <LeftLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Trading Pool BTC-BUSD
        </Text>
        <AddRetrieve />
        <TradingTable currentHistogram={histogram}/>
      </LeftLayout>
      <CenterLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Introduce
        </Text>
        <IntroducePanel />
        <GraphPanel currentHistogram={histogram}/>
      </CenterLayout>
    </Layout>
  )
}
