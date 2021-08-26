import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ParsedQs } from 'qs'
import { useActiveWeb3React } from '../../hooks'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import { addPopup, PopupContent, removePopup, toggleWalletModal, toggleSettingsMenu, toggleExchangeTab, toggleExchangeCoin, toggleExchangeToken } from './actions'
import { AppDispatch, AppState } from '../index'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen)
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch])
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen)
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch])
}

export function useExchangeTab(): string {
  return useSelector((state: AppState) => state.application.exchangeTab)
}

export function useToggleExchangeTab(): (tabName: string) => void {
  const dispatch = useDispatch()
  return useCallback((tabName: string) => {dispatch(toggleExchangeTab({tabName}))}, [dispatch])
}

export function useExchangeCoin(): string {
  return useSelector((state: AppState) => state.application.exchangeCoin)
}

export function useToggleExchangeCoin(): (coinName: string) => void {
  const dispatch = useDispatch()
  return useCallback((coinName: string) => {dispatch(toggleExchangeCoin({coinName}))}, [dispatch])
}

export function useExchangeToken(): string {
  return useSelector((state: AppState) => state.application.exchangeToken)
}

export function useToggleExchangeToken(): (tokenName: string) => void {
  const dispatch = useDispatch()
  return useCallback((tokenName: string) => {dispatch(toggleExchangeToken({tokenName}))}, [dispatch])
}

function parseTokenDataFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    if (urlParam.toUpperCase() === '2LC') return '2LC'
    if (urlParam.toUpperCase() === 'BNB') return 'BNB'
    if (urlParam.toUpperCase() === 'BUSD') return 'BUSD'
    if (urlParam.toUpperCase() === 'BETH') return 'BETH'
    if (urlParam.toUpperCase() === 'BNB') return 'BNB'
  }
  return ''
}

interface CoinData {
  exchangeCoin: string
  exchangeToken: string
}

export function queryParametersToTokenState(parsedQs: ParsedQs): CoinData {
  let coin = ''
  let token = ''
  coin = parseTokenDataFromURLParameter(parsedQs.coin)
  token = parseTokenDataFromURLParameter(parsedQs.token)

  return {
    exchangeCoin: coin,
    exchangeToken: token,
  }
}

export function useTokenDataFromURLSearch():
  | { coin: string | undefined; token: string | undefined }
  | undefined {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const [result, setResult] = useState<{ coin: string | undefined; token: string | undefined } | undefined>()

  useEffect(() => {
    if (!chainId) return
    const parsed = queryParametersToTokenState(parsedQs)

    dispatch(toggleExchangeCoin({coinName: parsed.exchangeCoin}))
    dispatch(toggleExchangeToken({tokenName: parsed.exchangeToken}))

    setResult({ coin: parsed.exchangeCoin, token: parsed.exchangeToken })
  }, [dispatch, chainId, parsedQs])

  return result
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}
