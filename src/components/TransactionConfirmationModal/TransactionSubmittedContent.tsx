import { ChainId, Currency, Token } from '@overage69/pancake-sdk-v2'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Button, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { registerToken } from '../../utils/wallet'
import MetamaskIcon from '../../assets/images/metamask.png'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash, currencyToAdd }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)
  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)
  const isMetamask = window.ethereum && window.ethereum.isMetaMask

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>View on bscscan</LinkExternal>
          )}
          {token && isMetamask && (
            <Button
              mt="12px"
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <Flex>
                {`Add ${token.symbol} to Metamask`}
              </Flex>
            </Button>
          )}
          <Button onClick={onDismiss} mt="20px">
            Close
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
