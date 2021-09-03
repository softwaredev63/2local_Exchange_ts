import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'
import Popups from '../components/Popups'
import Footer from '../components/Footer'
import Web3ReactManager from '../components/Web3ReactManager'
import Exchange from './Exchange'
import Swap from './Exchange/Swap'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'

import TradingPage from './TradingPage'
import { RedirectToSwap } from './Exchange/Swap/redirects'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import RedirectPathToExchange from './Redirects'

import Menu from '../components/Menu'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 30px;
  min-height: calc(100vh - 152px);
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  background-image: url('/static/media/bg.bfd323f2.png');
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export const BodyWrapperOrg = styled(Card)`
  position: relative;
  max-width: 436px;
  width: 100%;
  z-index: 5;
`

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/" component={Exchange} />
                      <Route exact strict path="/launch-pool" component={Exchange} />
                      <Route exact strict path="/yield-farming" component={Exchange} />
                      <Route exact strict path="/airdrops" component={Exchange} />
                      <Route exact strict path='/find' component={PoolFinder} />
                      <Route exact strict path='/pool' component={Pool} />
                      <Route exact strict path='/create' component={RedirectToAddLiquidity} />
                      <Route exact path='/add' component={AddLiquidity} />
                      <Route exact path='/add/:currencyIdA' component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path='/add/:currencyIdA/:currencyIdB' component={RedirectDuplicateTokenIds} />
                      <Route exact strict path='/remove/:tokens' component={RedirectOldRemoveLiquidityPathStructure} />
                      <Route exact strict path='/remove/:currencyIdA/:currencyIdB' component={RemoveLiquidity} />
                      {/* <Route exact strict path="/:outputCurrency" component={RedirectToSwap} /> */}
                      <Route exact strict path="/trading" component={TradingPage} />
                      <Route component={RedirectPathToExchange} />
                    </Switch>
                  </Web3ReactManager>
                  <Footer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
