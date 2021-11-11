import React from 'react';
import TradingCharts from './TradingViewComponents/ChartComponent/TradingCharts';

export default function GraphPanel({currentHistogram}) {
  
  return (
    <div>
      <div style ={{marginTop: 50, marginLeft: 50}}>
        <TradingCharts currentHistogram={currentHistogram}/>
      </div>      
    </div>
  )
}
