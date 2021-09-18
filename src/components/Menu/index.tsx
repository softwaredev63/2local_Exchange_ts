import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@pancakeswap-libs/uikit'
import { Currency } from '@overage69/pancake-sdk-v2'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'
import { useCurrency } from '../../hooks/Tokens'
import useInterval from '../../hooks/useInterval'
import { useCurrencyBalance, useTokenBalance } from '../../state/wallet/hooks'
import { useSimplexCheckoutModalToggle } from '../../state/application/hooks'
import SimplexCheckoutModal from '../SimplexCheckoutModal'
import { L2L, CAKE, UNI, BTCB, ETH } from '../../constants'

interface PriceDataProps {
  date: string
  price_2lc: number
  price_eth: number
  price_cake: number
  price_uni: number
  price_btcb: number
  price_bnb: number
}

const Menu: React.FC = props => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = useGetPriceData()

  const [priceData, setPriceData] = useState<PriceDataProps>()
  const [costBNB, setCostBNB] = useState(0)
  const [cost2LC, setCost2LC] = useState(0)
  const [costETH, setCostETH] = useState(0)
  const [costCAKE, setCostCAKE] = useState(0)
  const [costUNI, setCostUNI] = useState(0)
  const [costBTCB, setCostBTCB] = useState(0)

  const [totalCost, setTotalCost] = useState(0)

  const simplexCheckoutModalToggle = useSimplexCheckoutModalToggle()

  const balanceBNB = useCurrencyBalance(account ?? undefined, useCurrency('ETH') ?? undefined)
  const balanceL2L = useTokenBalance(account ?? undefined, L2L)
  const balanceETH = useTokenBalance(account ?? undefined, ETH)
  const balanceCAKE = useTokenBalance(account ?? undefined, CAKE)
  const balanceUNI = useTokenBalance(account ?? undefined, UNI)
  const balanceBTCB = useTokenBalance(account ?? undefined, BTCB)

  const updatePriceChangeCallback = useCallback(() => {
    fetch('https://exchangeapi.2local.io/getLastPriceData')
      .then((response) => response.json())
      .then((responseData) => {
        setPriceData(responseData[0])
      })
  }, [ setPriceData ])

  useInterval(updatePriceChangeCallback, 10000)

  const linkData = links

  useEffect(() => {
    if (linkData && priceData) {
      if (linkData[0].items) {      
        if (linkData[0].items[0]) {
          if (balanceBNB && priceData.price_bnb) {
            const balance = Number(balanceBNB.toSignificant())
            linkData[0].items[0].balance = balance
            linkData[0].items[0].cost = balance * priceData.price_bnb
            setCostBNB(balance * priceData.price_bnb)
          }
          if (linkData[0].items[0].items) {
            const tokenLength = linkData[0].items[0].items.length
            for (let i = 0; i < tokenLength; i ++) {
              if (linkData[0].items[0].items[i]) {
                if (i === 0 && balanceL2L && priceData.price_2lc) {
                  const balance = Number(balanceL2L.toSignificant())
                  linkData[0].items[0].items[i].balance = balance
                  linkData[0].items[0].items[i].cost = balance * priceData.price_2lc
                  setCost2LC(balance * priceData.price_2lc)
                } else if (i === 1 && balanceETH) {
                  const balance = Number(balanceETH.toSignificant())
                  linkData[0].items[0].items[i].balance = balance
                  linkData[0].items[0].items[i].cost = balance * priceData.price_eth
                  setCostETH(balance * priceData.price_eth)
                } else if (i === 2 && balanceCAKE && priceData.price_cake) {
                  const balance = Number(balanceCAKE.toSignificant())
                  linkData[0].items[0].items[i].balance = balance
                  linkData[0].items[0].items[i].cost = balance * priceData.price_cake
                  setCostCAKE(balance * priceData.price_cake)
                } else if (i === 3 && balanceUNI && priceData.price_uni) {
                  const balance = Number(balanceUNI.toSignificant())
                  linkData[0].items[0].items[i].balance = balance
                  linkData[0].items[0].items[i].cost = balance * priceData.price_uni
                  setCostUNI(balance * priceData.price_uni)
                } else if (i === 4 && balanceBTCB && priceData.price_btcb) {
                  const balance = Number(balanceBTCB.toSignificant())
                  linkData[0].items[0].items[i].balance = balance
                  linkData[0].items[0].items[i].cost = balance * priceData.price_btcb
                  setCostBTCB(balance * priceData.price_btcb)
                }
              }
            }          
          }
        }
      }
    }
  }, [ priceData, balanceBNB, balanceL2L, balanceETH, balanceCAKE, balanceUNI, balanceBTCB, linkData ])

  useEffect(() => {
    const total = costBNB + cost2LC + costETH + costCAKE + costUNI + costBTCB
    setTotalCost(total)
  }, [ costBNB, cost2LC, costETH, costCAKE, costUNI, costBTCB ])

  return (
    <>
      <UikitMenu
        links={links}
        priceLink="https://www.coingecko.com/en/coins/goose-finance"
        account={account as string}
        login={(connectorId: ConnectorId) => {
          if (connectorId === 'walletconnect') {
            return activate(walletconnect)
          }

          if (connectorId === 'bsc') {
            return activate(bsc)
          }

          return activate(injected)
        }}
        logout={deactivate}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage?.code || ''}
        langs={allLanguages}
        setLang={setSelectedLanguage}
        cakePriceUsd={cakePriceUsd}
        {...props}
        onBuyCryptoWithSimplex={simplexCheckoutModalToggle}
        showBalanceContol
        totalCost={totalCost}
        showBuyButton
        showContractButton
      />
      <SimplexCheckoutModal />
    </>
  )
}

export default Menu
