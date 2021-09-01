import React from 'react'
import {  Text } from '@pancakeswap-libs/uikit'
import Row from '../../components/Row'
import { LightCard, OutlineCard } from '../../components/Card'
import { Description, DetailDescription } from './styleds'
import Graph from './GraphPanel'

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19.45" height="19.45" viewBox="0 0 19.45 19.45"><g transform="translate(0 0)"><path d="M9.725,0A9.725,9.725,0,1,1,0,9.725H0A9.7,9.7,0,0,1,9.67,0Z" fill="#3bb54a"/><path d="M92.8,105.515l-6.907,6.907-3.868-3.84,1.575-1.547,2.293,2.266,5.332-5.332Z" transform="translate(-77.687 -98.47)" fill="#fff"/></g></svg>
)
const GreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13.522" height="13.534" viewBox="0 0 13.522 13.534"><g transform="translate(-0.142)"><g transform="translate(0.142)"><path d="M12.372,0H3.209A1.291,1.291,0,0,0,1.937,1.511,1.337,1.337,0,0,0,3.28,2.583H8.317A2.583,2.583,0,0,0,9.1,2.46l.426-.136L.555,11.294a1.337,1.337,0,0,0-.187,1.711,1.291,1.291,0,0,0,1.937.168l9.034-9.008-.1.284a2.583,2.583,0,0,0-.155.878v5.056a1.337,1.337,0,0,0,1.072,1.343,1.291,1.291,0,0,0,1.511-1.291V1.291A1.291,1.291,0,0,0,12.372,0Z" transform="translate(-0.142)" fill="#2bff22"/></g></g></svg>
)
const RedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13.534" height="13.522" viewBox="0 0 13.534 13.522"><g transform="translate(13.534 -0.142) rotate(90)"><g transform="translate(0.142)"><path d="M12.372,0H3.209A1.291,1.291,0,0,0,1.937,1.511,1.337,1.337,0,0,0,3.28,2.583H8.317A2.583,2.583,0,0,0,9.1,2.46l.426-.136L.555,11.294a1.337,1.337,0,0,0-.187,1.711,1.291,1.291,0,0,0,1.937.168l9.034-9.008-.1.284a2.583,2.583,0,0,0-.155.878v5.056a1.337,1.337,0,0,0,1.072,1.343,1.291,1.291,0,0,0,1.511-1.291V1.291A1.291,1.291,0,0,0,12.372,0Z" transform="translate(-0.142)" fill="#f22"/></g></g></svg>
)

export default function IntroducePanel() {
  return (
        <OutlineCard>
          <Row style={{alignContent:"left"}}>
            <Text color="#333333" style={{fontSize:18,textAlign:"center"}}>
              <b>Steps</b>
            </Text>
          </Row>
          <Row style={{padding:5,paddingTop:10,textAlign:"left"}}>
              <TickIcon /> &nbsp;&nbsp;
              <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                Add BUSD to Pool for the lock period you prefer.
              </Text>
          </Row>
          <Row style={{padding:5}}>
              <TickIcon /> &nbsp;&nbsp;
            <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
              It will be converted to 2LC-T for the same value.
            </Text>
          </Row>
          <Row style={{padding:5}}>
              <TickIcon /> &nbsp;&nbsp;
              <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                The tokens will be used for trading BTC-BUSD at Binance.
              </Text>
          </Row>
          <Row style={{padding:5}}>
              <TickIcon /> &nbsp;&nbsp;
              <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                The exchange value of the 2LC-T will be following the changes of trading.
              </Text>
          </Row>
          <hr style={{marginTop:15,marginBottom:15}} />
          <Row>
            <Description>
              <div style={{borderRight:'1px solid',borderColor:'#D5D5D5',width:'93%',height:'98%'}}>
              <Row >
                <Text color="#333333" style={{fontSize:18,textAlign:"center"}}>
                  <b>Trading BTC(UP)</b>
                </Text>
              </Row>
              <Row style={{padding:5,paddingTop:10}}>
                <GreenIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                  MACD (3,6,9) 8H, 4H, 1H, 3m, 1m, is positive: Buying
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <GreenIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                MACD (3,6,9) 1H  0: Selling
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <GreenIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                  One day price change  -2.5%: Selling
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <GreenIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                1 hour price change  -0.5%: Selling
                </Text>
              </Row>
              </div>
            </Description>
            <DetailDescription>
              <Row >
                <Text color="#333333" style={{fontSize:18,textAlign:"center"}}>
                  <b>Trading borrowed BTC (DOWN)</b>
                </Text>
              </Row>
              <Row style={{padding:5,paddingTop:10}}>
                <RedIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                MACD (3,6,9) 8H, 4H, 1H, 15m, 3m, 1m, is negative: Selling
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <RedIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                MACD (3,6,9) 1H  0: Buying (repaying)
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <RedIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                One day price change  +2.5%: Buying (repaying)
                </Text>
              </Row>
              <Row style={{padding:5}}>
                <RedIcon /> &nbsp;&nbsp;
                <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
                1 hour price change  +1.5%: Buying (repaying)
                </Text>
              </Row>
            </DetailDescription>
          </Row>
          <Row style={{paddingTop:15}}>
            <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
              Withdraw tokens will be available after lockup period and 48H after a trading round.
            </Text>
          </Row>
          <Row>
            <Text color="#727272" style={{fontSize:18,textAlign:"center"}}>
              Transfer fee = 3%
            </Text>
          </Row>
        </OutlineCard>
  )
}
