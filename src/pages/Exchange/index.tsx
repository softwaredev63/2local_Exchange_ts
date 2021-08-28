import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import TranslatedText from 'components/TranslatedText'
import { useTokenDataFromURLSearch } from 'state/application/hooks'
import AppBody from '../AppBody'
import { Description, LayoutTokenDescription, Layout, IconWrapper } from './styleds'
import Pencil from '../../assets/images/pencil.svg'
import Swap from './Swap'
import Graph from './Graph'
import TabBar from './TabBar'

const TabArea = styled.div`
  border-radius: 0px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`

export default function Exchange() {
  const [coin, setCoin] = useState<string>('')
  const [token, setToken] = useState<string>('')

  const tokenData = useTokenDataFromURLSearch()

  useEffect(() => {
    if (tokenData?.coin) {
      setCoin(tokenData?.coin)
    } else {
      setCoin('BNB')
    }
    if (tokenData?.token) {
      setToken(tokenData?.token)
    } else {
      setToken('2LC')
    }
  }, [tokenData])

  return (
    <Layout>
      <LayoutTokenDescription>
        <Description>
          <TranslatedText translationId={102}>{token}</TranslatedText>
        </Description>
        <IconWrapper size={28}>
          <img src={Pencil} alt="Edit Description" />
        </IconWrapper>
      </LayoutTokenDescription>
      <Graph coin={coin} token={token} />
      <TabArea>
        {/* <TabBar /> */}
        <Swap />
      </TabArea>
    </Layout>
  )
}
