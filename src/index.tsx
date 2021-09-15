import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
   localStorage?.removeItem('redux_localstorage_simple_lists')
})

/* =======  Load Simplex script begin ======= */
const script = document.createElement('script');
script.src = process.env.REACT_APP_SIMPLEX_SCRIPT_SRC || 'https://cdn.test-simplexcc.com/sdk/v1/js/sdk.js';
script.id = 'simplexSDK';
script.async = true;
document.body.appendChild(script);

// @ts-ignore
window.simplexAsyncFunction = function () {
  // @ts-ignore
  Simplex.init({ public_key: process.env.REACT_APP_SIMPLEX_PUBLIC_KEY });
};
/* =======  Load Simplex script end ======= */

ReactDOM.render(
  <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
