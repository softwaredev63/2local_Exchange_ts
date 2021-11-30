import { createReducer, nanoid } from '@reduxjs/toolkit'
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
  toggleExchangeTab,
  toggleExchangeCoin,
  toggleExchangeToken,
  toggleSimplexCheckoutModal,
  toggleIndacoinCheckoutModal,
  toggleIndacoin2LCCheckoutModal,
} from './actions'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  blockNumber: { [chainId: number]: number }
  popupList: PopupList
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  exchangeTab: string
  exchangeCoin: string
  exchangeToken: string
  simplexCheckoutModalOpen: boolean
  indacoionCheckoutModalOpen: boolean
  indacoion2LCCheckoutModalOpen: boolean
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
  exchangeTab: 'Send',
  exchangeCoin: 'BNB',
  exchangeToken: '2LC',
  simplexCheckoutModalOpen: false,
  indacoionCheckoutModalOpen: false,
  indacoion2LCCheckoutModalOpen: false,
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(toggleWalletModal, state => {
      state.walletModalOpen = !state.walletModalOpen
    })
    .addCase(toggleSettingsMenu, state => {
      state.settingsMenuOpen = !state.settingsMenuOpen
    })
    .addCase(toggleExchangeTab, (state, { payload: { tabName } }) => {
      state.exchangeTab = tabName
    })
    .addCase(toggleExchangeCoin, (state, { payload: { coinName } }) => {
      state.exchangeCoin = coinName
    })
    .addCase(toggleExchangeToken, (state, { payload: { tokenName } }) => {
      state.exchangeToken = tokenName
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs
        }
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(toggleSimplexCheckoutModal, state => {
      state.simplexCheckoutModalOpen = !state.simplexCheckoutModalOpen
    })
    .addCase(toggleIndacoinCheckoutModal, state => {
      state.indacoionCheckoutModalOpen = !state.indacoionCheckoutModalOpen
    })
    .addCase(toggleIndacoin2LCCheckoutModal, state => {
      state.indacoion2LCCheckoutModalOpen = !state.indacoion2LCCheckoutModalOpen
    })
)
