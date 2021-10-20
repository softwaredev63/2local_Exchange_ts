import React, { useEffect, useState } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { OutlineCard } from '../../components/Card'
import { BLACK_COLOR, RED_COLOR, GREEN_COLOR } from '../../constants/colors'
import api from '../../connectors/api'

export default function TradingTable({ currentMACD }) {
  const [tradingRound, setTradingRound] = useState<number>(0);
  const [totalBUSD, setTotalBUSD] = useState<number>(0);
  const [highestAdd, setHighestAdd] = useState<number>(0);
  const [tradingFor, setTradingFor] = useState<string>('');
  const [feePercent, setFeePercent] = useState<number>(0);
  const [tradingRoundsPrice, setTradingRoundsPrice] = useState<number[]>([]);
  const [priceChange2LCT, setPriceChange2LCT] = useState<any>({});

  const updateTradingData = () => {
    api.fetchData('tradingRound').then((d: any) => setTradingRound(d))
    api.fetchData('totalBUSD').then((d: any) => setTotalBUSD(d))
    api.fetchData('highestAdd').then((d: any) => setHighestAdd(d))
    api.fetchData('tradingFor').then((d: any) => setTradingFor(d))
    api.fetchData('feePercent').then((d: any) => setFeePercent(d))
    api.fetchData('tradingRoundsPrice').then((d: any) => {
      setTradingRoundsPrice(Object.values(d).reverse() as number[]);
    })
    api.fetchData('change2LCTforDays').then((d: any) => setPriceChange2LCT(d))
  }

  useEffect(() => {
    updateTradingData();
  }, [])

  return (
    <OutlineCard style={{ marginTop: 25 }}>
      <table width="100%" style={{ paddingLeft: 10 }}>
        <tr>
          <td style={{ textAlign: 'left', width: '30%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Trading round
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '35%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              {tradingRound}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD in Pool
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              {totalBUSD.toFixed(4)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              2LC-T highest add
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              {highestAdd}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Pool trading for
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              {tradingFor}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Service fee
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              {feePercent}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              2LC-T change 24H
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
            {priceChange2LCT['1d'] ? priceChange2LCT['1d'].toFixed(2) : '-'}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              2LC-T change 7D
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
            {priceChange2LCT['7d'] ? priceChange2LCT['7d'].toFixed(2) : '-'}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              2LC-T change 30D
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
            {priceChange2LCT['30d'] ? priceChange2LCT['30d'].toFixed(2) : '-'}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              2LC-T change ∞
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
            {priceChange2LCT['first'] ? priceChange2LCT['first'].toFixed(2) : '-'}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Value
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              275
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              1
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BTC
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              0.00085001
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BTC
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              MACD (3,6,9) 8H
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={currentMACD.macd_8h < 0 ? RED_COLOR : BLACK_COLOR} style={{ fontSize: 16 }}>
              {currentMACD.macd_8h.toFixed(2)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              MACD (3,6,9) 4H
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={currentMACD.macd_4h < 0 ? RED_COLOR : BLACK_COLOR} style={{ fontSize: 16 }}>
              {currentMACD.macd_4h.toFixed(2)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              MACD (3,6,9) 1H
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={currentMACD.macd_1h < 0 ? RED_COLOR : BLACK_COLOR} style={{ fontSize: 16 }}>
              {currentMACD.macd_1h.toFixed(2)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color="#333333" style={{ fontSize: 16 }}>
              *
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              MACD (3,6,9) 15m
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={currentMACD.macd_15m < 0 ? RED_COLOR : BLACK_COLOR} style={{ fontSize: 16 }}>
              {currentMACD.macd_15m.toFixed(2)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              MACD (3,6,9) 1m
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={currentMACD.macd_1m < 0 ? RED_COLOR : BLACK_COLOR} style={{ fontSize: 16 }}>
              {currentMACD.macd_1m.toFixed(2)}
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color="#DE0505" style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Transferred IN
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              250
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              BUSD
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Value Change
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={GREEN_COLOR} style={{ fontSize: 16 }}>
              10.2
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={GREEN_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Value Change 24h
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={GREEN_COLOR} style={{ fontSize: 16 }}>
              1.5
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={GREEN_COLOR} style={{ fontSize: 16 }}>
              %
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', width: '50%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              Closing Price Rounds
            </Text>
          </td>
          <td style={{ textAlign: 'right', width: '25%' }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
          <td style={{ textAlign: 'left', paddingLeft: 10 }}>
            <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
              &nbsp;
            </Text>
          </td>
        </tr>
        {
          tradingRoundsPrice.map((p, i) => (
            <tr key={`trading-round-price-${i}`}>
              <td style={{ textAlign: 'left', width: '50%' }}>
                <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
                  Round {tradingRoundsPrice.length - i - 1} 2LC-T
                </Text>
              </td>
              <td style={{ textAlign: 'right', width: '25%' }}>
                <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
                  {p.toFixed(4)}
                </Text>
              </td>
              <td style={{ textAlign: 'left', paddingLeft: 10 }}>
                <Text color={BLACK_COLOR} style={{ fontSize: 16 }}>
                  BUSD
                </Text>
              </td>
            </tr>
          ))
        }
      </table>
    </OutlineCard>
  )
}
