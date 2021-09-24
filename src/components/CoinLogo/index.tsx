import { Currency, ETHER, Token } from '@overage69/pancake-sdk-v2'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/binance-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import CoinLogo from '../pancake/CoinLogo'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  opacity: 1;
  vertical-align: middle;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  coin = 'BEP20',
  size = '24px',
  style,
}: {
  coin?: string
  size?: string
  style?: React.CSSProperties
}) {
  const srcs: string[] = useMemo(() => {
    return [`/images/2local/${coin}.svg`]
  }, [ coin ])

  return (
    <CoinLogo size={size} srcs={srcs} alt={`${coin} logo`} style={style} />
  )
}
