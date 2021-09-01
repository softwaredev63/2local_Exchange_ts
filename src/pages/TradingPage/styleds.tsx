import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import exp from 'constants'


export const ChartArea = styled.div`
  border-radius: 12px;
  padding-bottom: 1.5rem;
`

export const Price = styled.div`
  font-size: 12px;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  color: #000000;
`


export const Layout = styled.div`
  text-align: left;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
`
export const LeftLayout = styled.div`
  width: 400px;
`

export const CenterLayout = styled.div`
  flex: 1;
  margin-left: 60px;
  margin-right: 30px;
  background: white transparency;
`

export const LayoutTokenDescription = styled.div`
  display: flex;
`

export const Description = styled(Text)`
  width:50%;
  flex: 1;  
  background: white transparency;
`

export const DetailDescription = styled(Text)`
  width:50%;
  background: white transparency;
`

export const Percent = styled(Text)`
  margin-top: -5px;
  margin-left: 5px;
  font: Swis721 BT;
`

export const ContractAddress = styled(Text)`
  font: normal normal bold 16px/6px Swis721 BT;
  letter-spacing: 0.18px;
  opacity: 0.36;
  margin-right: 30px;
`

export const PriceArea = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  display: flex;
  font-size: 20px;
`

export const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? `${size}px` : '32px')};
    width: ${({ size }) => (size ? `${size}px` : '32px')};
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`