import React from 'react';
import TradingCharts from './TradingViewComponents/ChartComponent/TradingCharts';

export default function GraphPanel({currentMACD}) {

  // const [macd, setMacd] = useState();
  const sendMACDToParent = (childMACDData: any) => {
    // setMacd(childMACDData);    
    currentMACD(childMACDData);
  };
  return (
    <div>
      <div style ={{marginTop: 50, marginLeft: 50}}>
        <TradingCharts currentMACD={sendMACDToParent}/>
      </div>      
    </div>
  )
}
