import React from 'react';
import TradingCharts from './TradingViewComponents/ChartComponent/TradingCharts';
import { CenterLayout } from './styleds';

export default function GraphPanel() {
  return (
    <div>
      <div style ={{marginTop: 50, marginLeft: 50}}>
        <TradingCharts/>
      </div>      
    </div>
  )
}
