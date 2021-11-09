import React from 'react'
import styled from 'styled-components'
import { Button, Text,  Modal } from '@pancakeswap-libs/uikit'
import { useSimplexCheckoutModalToggle, useIndacoinCheckoutModalToggle } from '../../state/application/hooks'

const ChannelItem = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  margin: 5px 0;
  align-items: center;
  background-color: #EFF4F5;
  color: #000000;
  font-style: Swis721;
  border-radius: 12px;
  cursor: pointer;
`

const LogoImage = styled.img`
  width: 40px;
  height: 30px;
  margin-right: 20px;
`

type SettingsModalProps = {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const BuyCryptoModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {

  const simplexCheckoutModalToggle = useSimplexCheckoutModalToggle()
  const indacoinCheckoutModalToggle = useIndacoinCheckoutModalToggle()

  return (
    <Modal title="Choose your payment channel" onDismiss={onDismiss}>
      <ChannelItem onClick={() => {
          simplexCheckoutModalToggle()
          onDismiss()
        }}>
        <LogoImage src="images/simplex.svg" alt="simplex"/>
        Simplex
      </ChannelItem>
      <ChannelItem onClick={() => {
          indacoinCheckoutModalToggle()
          onDismiss()
        }}>
        <LogoImage src="images/indacoin.svg" alt="indacoin"/>
        2LC at IndaCoin
      </ChannelItem>
      <ChannelItem onClick={() => {
          indacoinCheckoutModalToggle()
          onDismiss()
        }}>
        <LogoImage src="images/indacoin.svg" alt="indacoin"/>
        IndaCoin
      </ChannelItem>
    </Modal>
  )
}

export default BuyCryptoModal
