import React from "react";
import { Text } from '@pancakeswap-libs/uikit'
import "../assets/Chart.css";
import Chart from "./Chart";
import ChartLamp from './ChartLamp';
import ChartArrow from './ChartArrow';
import ChartMark from './ChartMark';

import CustomChart from "./CustomChart";

export default function TradingCharts({currentHistogram}) {

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
          <ChartArrow value={currentHistogram['4h'] > 0 && currentHistogram['1h'] > 0 && currentHistogram['15m'] > 0 && currentHistogram['1m'] > 0 ? 'up' : 'down'} />
        </div>
        <div className="trading-chart">
          <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': 'D' }} />
        </div>
      </div>

      <div className="chart-container">
        <b className="macd-label">MACD 4H</b>
        <div className="macd-mark">
          <ChartMark checked={currentHistogram['1d'] > 0 && currentHistogram['4h'] > 0} />
        </div>
        <div className="macd-lamp">
          <ChartLamp on={currentHistogram['4h'] > 0} />
        </div>

        <div className="trading-chart">
          <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '240' }} />
        </div>
      </div>

      <div className="chart-container">
        <b className="macd-label">MACD 1H</b>
        <div className="macd-mark">
          <ChartMark checked={currentHistogram['1d'] > 0 && currentHistogram['4h'] > 0 && currentHistogram['1h'] > 0} />
        </div><div className="macd-lamp">
          <ChartLamp on={currentHistogram['1h'] > 0} />
        </div>

        <div className="trading-chart">
          <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '60' }} />
        </div>
      </div>

      <div className="chart-container">
        <b className="macd-label">MACD 15M</b>
        <div className="macd-mark">
          <ChartMark checked={currentHistogram['1d'] > 0 && currentHistogram['4h'] > 0 && currentHistogram['1h'] > 0 && currentHistogram['15m'] > 0} />
        </div>
        <div className="macd-lamp">
          <ChartLamp on={currentHistogram['15m'] > 0} />
        </div>

        <div className="trading-chart">
          <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '15' }} />
        </div>
      </div>

      <div className="chart-container">
        <b className="macd-label">MACD 1M</b>
        <div className="macd-mark">
          <ChartMark checked={currentHistogram['1d'] > 0 && currentHistogram['4h'] > 0 && currentHistogram['1h'] > 0 && currentHistogram['15m'] > 0 && currentHistogram['1m'] > 0} />
        </div>
        <div className="macd-lamp">
          <ChartLamp on={currentHistogram['1m'] > 0} />
        </div>
        <div className="trading-chart">
          <Chart chartMode={{ 'mode': 'macd', 'symbol': 'BTCBUSD', 'interval': '1' }} />
        </div>
      </div>
    </div>
  );
}
