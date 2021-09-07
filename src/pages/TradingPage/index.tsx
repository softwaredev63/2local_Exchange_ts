import React, {useState} from 'react'
import {  Text } from '@pancakeswap-libs/uikit'
import { CenterLayout, Layout, LeftLayout } from './styleds'
import AddRetrieve from './AddRetrieve'
import TradingTable from './TradingTable'
import IntroducePanel from './IntroducePanel'
import GraphPanel from './GraphPanel'


export default function TradingPage() {
  const [macd, setMacd] = useState({
    macd_1d: 0,
    macd_8h: 0,
    macd_4h: 0,
    macd_1h: 0,
    macd_15m: 0,
    macd_1m: 0,
  });
  const currentMACD = (childMACDData: any) => {
    setMacd(childMACDData);
  };
  return (
    <Layout>
      <LeftLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Trading Pool BTC-BUSD
        </Text>
        <AddRetrieve />
        <TradingTable currentMACD={macd}/>
      </LeftLayout>
      <CenterLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Introduce
        </Text>
        <IntroducePanel />
        <GraphPanel  currentMACD={currentMACD}/>
      </CenterLayout>
    </Layout>
  )
}
