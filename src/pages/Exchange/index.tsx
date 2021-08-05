import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import TranslatedText from 'components/TranslatedText'
import AppBody from '../AppBody'
import { Description, LayoutTokenDescription, Layout, IconWrapper } from './styleds'
import Pencil from '../../assets/images/pencil.svg'
import Swap from './Swap'
import Graph from './Graph'

export default function Exchange() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  return (
    <Layout>
      <LayoutTokenDescription>
        <Description>
          <TranslatedText translationId={102}>Binance Coin</TranslatedText>
        </Description>
        <IconWrapper size={30}>
          <img src={Pencil} alt="Edit Description" />
        </IconWrapper>
      </LayoutTokenDescription>
      <Graph />
      <AppBody>
        <Swap />
      </AppBody>
    </Layout>
  )
}
