import React from 'react'
import {  Text } from '@pancakeswap-libs/uikit'
import { CenterLayout, Layout, LeftLayout } from './styleds'
import AddRetrieve from './AddRetrieve'
import TradingTable from './TradingTable'
import IntroducePanel from './IntroducePanel'
import GraphPanel from './GraphPanel'

export default function TradingPage() {
  return (
    <Layout>
      <LeftLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Trading Pool BTC-BUSD
        </Text>
        <AddRetrieve />
        <TradingTable  />
      </LeftLayout>
      <CenterLayout>
        <Text color="#505050" style={{fontSize:24, padding: 10}}>
          Introduce
        </Text>
        <IntroducePanel />
        <GraphPanel />
      </CenterLayout>
    </Layout>
  )
}
