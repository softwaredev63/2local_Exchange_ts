import React, { Component } from "react";
import { Text } from '@pancakeswap-libs/uikit'
import "../assets/Chart.css";
import macd from 'macd';
import Chart from "./Chart";
import ChartLamp from './ChartLamp';
import ChartArrow from './ChartArrow';
import ChartMark from './ChartMark';

import CustomChart from "./CustomChart";

export interface MACDProps {
  currentMACD: (value: any) => void
}

export default class TradingCharts extends Component<MACDProps> {

  macdState: any;
  macdValue: any;

  constructor(props: MACDProps) {
    super(props);
    this.state = {
      macd_1d: 0,
      macd_8h: 0,
      macd_4h: 0,
      macd_1h: 0,
      macd_15m: 0,
      macd_1m: 0,
    };
  }

  componentDidMount() {
    (async () => {
      this.setMACDValue('1d');
      this.setMACDValue('8h');
      this.setMACDValue('4h');
      this.setMACDValue('1h');
      this.setMACDValue('15m');
      this.setMACDValue('1m');
    })();

    const interval = setInterval(() => {
      this.setMACDValue('1d');
      this.setMACDValue('8h');
      this.setMACDValue('4h');
      this.setMACDValue('1h');
      this.setMACDValue('15m');
      this.setMACDValue('1m');
    }, 60000);
    return () => clearInterval(interval);
  }

  async setMACDValue(interval) {
    const response = await fetch(`https://api.binance.com/api/v1/klines?symbol=BTCBUSD&interval=${interval}&limit=50`, { method: 'GET' });
    const res = await response.json();
    const closePrices = await res.map(candle => (
      parseFloat(candle[4])
    ));

    switch (interval) {
      case '1d': this.setState({ macd_1d: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
      case '8h': this.setState({ macd_8h: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
      case '4h': this.setState({ macd_4h: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
      case '1h': this.setState({ macd_1h: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
      case '15m': this.setState({ macd_15m: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
      case '1m': this.setState({ macd_1m: macd(closePrices, 6, 3, 9).MACD[50 - 1] }); break;
    }

    const { currentMACD } = this.props;
    currentMACD(this.state);
  }

  render() {
    this.macdState = this.state;
    return (
      <div>
        <div className="chart-container">
          <b className="macd-label">2LCT-BUSD</b>          
          <div className="trading-chart">
            <CustomChart/>
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">BTC-BUSD</b>
          <Text color="#727272" style={{ fontSize: 18 }}>We use BTC-BUSD only for trading data when to swap to BTCB or BUSD</Text>
          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'price', 'symbol': 'BTCBUSD', 'interval': '1' }} />
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">MACD 1D</b>
          <div className="macd-mark">
            <ChartArrow value={this.macdState.macd_1d} />
          </div>
          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': 'D' }} />
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">MACD 4H</b>
          <div className="macd-mark">
            <ChartMark checked={this.macdState.macd_1d > 0 && this.macdState.macd_4h > 0} />
          </div>
          <div className="macd-lamp">
            <ChartLamp value={this.macdState.macd_4h} />
          </div>

          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '240' }} />
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">MACD 1H</b>
          <div className="macd-mark">
            <ChartMark checked={this.macdState.macd_1d > 0 && this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0} />
          </div><div className="macd-lamp">
            <ChartLamp value={this.macdState.macd_1h} />
          </div>

          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '60' }} />
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">MACD 15M</b>
          <div className="macd-mark">
            <ChartMark checked={this.macdState.macd_1d > 0 && this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0} />
          </div>
          <div className="macd-lamp">
            <ChartLamp value={this.macdState.macd_15m} />
          </div>

          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '15' }} />
          </div>
        </div>

        <div className="chart-container">
          <b className="macd-label">MACD 1M</b>
          <div className="macd-mark">
            <ChartMark checked={this.macdState.macd_1d > 0 && this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0 && this.macdState.macd_1m > 0} />
          </div>
          <div className="macd-lamp">
            <ChartLamp value={this.macdState.macd_1m} />
          </div>
          <div className="trading-chart">
            <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '1' }} />
          </div>
        </div>
      </div>
    );
  }
}
