import React, { Component } from "react";
import "../assets/Chart.css";
import macd from 'macd';
import Chart from "./Chart";

export default class TradingCharts extends Component {  
  
  macdState:any;
  macdValue:any;

  constructor(p){
    super(p);
    this.state = {
      macd_1d: 0,
      macd_4h: 0,
      macd_1h: 0,
      macd_15m: 0,
      macd_1m: 0,
    }; 
  } 
  
  componentDidMount() { 
    (async () => {
      this.setMACDValue('1d');
      this.setMACDValue('4h');
      this.setMACDValue('1h');
      this.setMACDValue('15m');
      this.setMACDValue('1m');
    })();

    const interval = setInterval(() => {        
      this.setMACDValue('1d');
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
    
    // console.log('histogram', interval, ': ', macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]);
    switch (interval){
      case '1d': this.setState({macd_1d: macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]}); break;
      case '4h': this.setState({macd_4h: macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]}); break;
      case '1h': this.setState({macd_1h: macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]}); break;
      case '15m': this.setState({macd_15m: macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]}); break;
      case '1m': this.setState({macd_1m: macd(closePrices, 6, 3, 9).MACD[50-1] - macd(closePrices, 6, 3, 9).signal[50-1]}); break;
    }    
  }

  render() {
    this.macdState= this.state;
    return (
      <div>
        <div className="container"> 
          <h5>2LCT-BUSD</h5>
          <div className="hide-block "></div>
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'price', 'symbol': 'BNBBUSD', 'interval': '1'}}/>
          </div>     
        </div>

        <div className="container"> 
          <h5>BTC-BUSD</h5>    
          <div className="hide-block "></div>
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'price', 'symbol': 'BTCBUSD', 'interval': '1'}}/>
          </div>  
        </div>
        
        <div className="container"> 
          <div className="hide-block "> 
            <div className="macd-icons">
              {
                this.macdState.macd_1d > 0 ? 
                <div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#94C01E" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#b0b0b0" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                  </svg>
                </div>
              }
            </div>
          </div>          
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': 'D'}}/>
          </div>
        </div>

        <div className="container"> 
          <div className="hide-block "> 
            <div className="macd-icons">
              {
                this.macdState.macd_4h > 0 ? 
                <div>                
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#94C01E" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                  </svg>
                </div>
                :               
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#b0b0b0" className="bi bi-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  </svg>
                </div>
              }
            </div>
          </div>
          <div className="hide-block-lamp">
            <div className="macd-lamp">
              {
                this.macdState.macd_4h > 0 ? 
                <div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#94C01E" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FF4600" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
              }
            </div>
          </div>
          
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '240'}}/>
          </div>        
        </div>

        <div className="container"> 
          <div className="hide-block "> 
            <div className="macd-icons">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 ?
                <div>                
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#94C01E" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#b0b0b0" className="bi bi-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  </svg>
                </div>
              }
            </div>
          </div>
          <div className="hide-block-lamp">
            <div className="macd-lamp">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 ?
                <div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#94C01E" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FF4600" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
              }
            </div>
          </div>
          
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '60'}}/>
          </div>        
        </div>

        <div className="container"> 
          <div className="hide-block "> 
            <div className="macd-icons">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0 ?
                <div>                
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#94C01E" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#b0b0b0" className="bi bi-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  </svg>
                </div>
              }
            </div>
          </div>  
          <div className="hide-block-lamp">
            <div className="macd-lamp">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0 ?
                <div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#94C01E" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FF4600" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
              }
            </div>
          </div>
          
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '15'}}/>
          </div>        
        </div>

        <div className="container"> 
          <div className="hide-block "> 
            <div className="macd-icons">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0 && this.macdState.macd_1m > 0 ?
                <div>                
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#94C01E" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#b0b0b0" className="bi bi-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  </svg>
                </div>
              }
            </div>
          </div>  
          <div className="hide-block-lamp">
            <div className="macd-lamp">
              {
                this.macdState.macd_4h > 0 && this.macdState.macd_1h > 0 && this.macdState.macd_15m > 0 && this.macdState.macd_1m > 0 ?
                <div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#94C01E" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
                :
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FF4600" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                </div>
              }
            </div>
          </div>                 
          <div className="trading-chart">
            <Chart chartMode={{'mode': 'macd', 'symbol': 'BTCUSDT', 'interval': '1'}}/>
          </div>        
        </div>
      </div>
    );
  }
}
