import React, { Component } from "react";
import "../assets/Chart.css";

import Chart from "./Chart";


export default class TradingCharts extends Component {  
  
  render() {
    
    return (
      <div>

        <div className="container"> 
          <h5>BTC-BUSD</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'price', 'symbol': 'BTCBUSD', 'interval': '1'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>2LCT-BUSD</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'price', 'symbol': 'BNBBUSD', 'interval': '1'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>MACD 1M</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '1'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>MACD 15M</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '15'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>MACD 1H</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '60'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>MACD 4H</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '240'}}/>
          </div>        
        </div>

        <div className="container"> 
          <h5>MACD 1D</h5>
          <div className="hide-block"></div>     
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': 'D'}}/>
          </div>        
        </div>

      </div>
    );
  }
}
