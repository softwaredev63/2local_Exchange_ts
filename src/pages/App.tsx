import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import Exchange from './Exchange'
import Swap from './Exchange/Swap'
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

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
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
                      <Route exact strict path="/swap" component={Swap} />
                      <Route exact strict path="/:outputCurrency" component={RedirectToSwap} />
                      <Route exact strict path="/trading" component={TradingPage} />
                      <Route component={RedirectPathToExchange} />
                    </Switch>
                  </Web3ReactManager>
                  <Marginer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </BrowserRouter>
    </Suspense>
  )
}
