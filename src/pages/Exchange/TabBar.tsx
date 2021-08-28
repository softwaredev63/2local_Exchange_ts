import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from "react-redux";
import TranslatedText from 'components/TranslatedText'
import { useExchangeTab, useToggleExchangeTab } from '../../state/application/hooks'

const TabCategory = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 30px;
  border-bottom: 1px solid #c3c3c3;
  padding: 10px 0;
`

const TabItem = styled.div<{ match: boolean }>`
  font: normal normal 1000 28px/30px Swis721 BT;
  font-size: 20px;
  margin: 0 30px;
  &:hover {
    cursor: pointer;
  }
  border-bottom: 3px solid ${({ match }) => (match ? '#DF642B' : 'transparent')};
  opacity: ${({ match }) => (match ? '1' : '0.6')};
`

export default function TabBar() {
  const currentTab = useExchangeTab()
  const setTab = useToggleExchangeTab()

  console.log("pooh, currentTab = ", currentTab)

  const compareTab = (item: string) => {
    if (item === currentTab) {
      return true
    }
    return false
  }

  return (
    <TabCategory>
      <TabItem match={compareTab("Send")}
        onClick={() => {setTab("Send")}}
      >
        Send
      </TabItem>
      <TabItem match={compareTab("Receive")}
        onClick={() => {setTab("Receive")}}
      >
        Receive
      </TabItem>
      <TabItem match={compareTab("Swap")}
        onClick={() => {setTab("Swap")}}
      >
        Swap
      </TabItem>
      <TabItem match={compareTab("Transaction")}
        onClick={() => {setTab("Transaction")}}
      >
        Transaction
      </TabItem>
    </TabCategory>
  )
}
