import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { RowBetween } from 'components/Row'

import { useActiveWeb3React } from 'hooks'
import TranslatedText from 'components/TranslatedText'
import AppBody from '../AppBody'
import {
  Description,
  DetailDescription,
  LayoutTokenDescription,
  Layout,
  Percent,
  PriceArea,
  IconWrapper,
  ContractAddress,
} from './styleds'
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
      <RowBetween>
        <DetailDescription>
          <Text fontSize="18px">1 BNB : 387.38 USD &nbsp;</Text>
          <PriceArea>
            <FontAwesomeIcon icon={faArrowUp} color="#56e19f" />
            <Percent fontSize="18px" color="#56e19f">
              8.68%
            </Percent>
          </PriceArea>
        </DetailDescription>
        <ContractAddress>02d5d94756cdc38e0fc712e629b9fb</ContractAddress>
      </RowBetween>
      <Graph />
      <AppBody>
        <Swap />
      </AppBody>
    </Layout>
  )
}
