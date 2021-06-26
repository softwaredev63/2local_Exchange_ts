import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'HomeIcon',
    href: '/exchange',
  },
  {
    label: 'Launch Pool',
    icon: 'TradeIcon',
    href: '/launch-pool',
    items: [
      {
        label: 'Exchange',
        href: '/launch-pool',
        icon: 'TradeIcon',
      },
      {
        label: 'Liquidity',
        href: '/launch-pool/liquidity',
      },
    ],
  },
  {
    label: 'Yield Farming',
    icon: 'FarmIcon',
    href: '/yield-farming',
  },
  {
    label: 'Airdrops',
    icon: 'PoolIcon',
    href: '/airdrops',
  },
  {
    label: 'Address Book',
    icon: 'TicketIcon',
    href: '/address-book',
  },
]

export default config
