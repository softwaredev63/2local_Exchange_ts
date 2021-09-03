import React, { Component } from "react";
import binanceAPI from "../services/api";
import "../assets/Chart.css";
import { widget } from '../charting_library/charting_library';


export type chartMode = { chartMode?: any };

export default class Chart extends Component<chartMode> {
  
  widgetOptions:any;
  bfAPI:any;
  tradingViewWidget:any;
  chartObject:any;
  chartType:any;
  chartSymbol:any;
  chartInterval:any;
  chartId:any;

  constructor(p) {
    super(p);        
    const { chartMode = {'mode': 'price', 'symbol': 'BTCBUSD', 'interval': '1'} } = this.props;    
    this.chartType = chartMode.mode;
    this.chartSymbol = chartMode.symbol;
    this.chartInterval = chartMode.interval;
    this.chartId =  this.chartType + this.chartSymbol + this.chartInterval;
    

    this.bfAPI = new binanceAPI({ debug: false });
    this.widgetOptions = {
      container_id: this.chartId,
      datafeed: this.bfAPI,
      library_path: "/scripts/charting_library/",
      width:1200,
      height: 300,
      symbol: this.chartSymbol,
      interval: this.chartInterval,
      disabled_features: ["use_localstorage_for_settings", "create_volume_indicator_by_default", "timeframes_toolbar", "header_widget"],
      enabled_features: ["move_logo_to_main_pane", "hide_left_toolbar_by_default", "hide_series_legend_item"],
      locale: "en",
      overrides: {
        "mainSeriesProperties.style": 3,
        "mainSeriesProperties.lineStyle.color": "#66a5dc",
        "mainSeriesProperties.lineStyle.linewidth": 0,        
        "mainSeriesProperties.showPriceLine": true,

        "scalesProperties.showSymbolLabels": true,  
        "scalesProperties.showStudyLastValue":true,        
        "scalesProperties.showStudyPlotLabels":true,

        "mainSeriesProperties.priceAxisProperties.autoScale":false,
      },
      studies_overrides: {
        "macd.histogram.color": "#f8857c",
        "macd.macd.color": "#66a5dc",
        "macd.signal.color": "#ff9042",
        "macd.histogram.plottype": "columns",
      },      
    };
    this.tradingViewWidget = null;
    this.chartObject = null;
  }
  componentDidMount() {
    const tvWidget = new widget(this.widgetOptions);
    this.tradingViewWidget = tvWidget;
    this.chartReady();
  }
  componentDidUpdate() {
    if (!this.tradingViewWidget) return
  }
  chartReady = () => {
    if (!this.tradingViewWidget) return
    this.tradingViewWidget.onChartReady(() => {  
      if(this.chartType === 'macd') {
        this.tradingViewWidget.activeChart().getSeries().setVisible(false);
        this.tradingViewWidget.activeChart().getSeries().changePriceScale("new-left");            
        this.chartObject = this.tradingViewWidget.activeChart().createStudy('MACD', true, false, [3, 6, "close", 9]);
      }else if(this.chartType === 'price'){
        this.chartObject = this.tradingViewWidget.activeChart();
      }
      
    });
  };

  render() {
    return <div id={this.chartId}></div>
  }
}
