import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: '/exchange',
    items: [
      {
        label: 'BNB',
        href: '/exchange',
        icon: 'BNBIcon',
        items: [
          {
            label: '2LC',
            href: '/exchange?coin=bnb&token=2lc',
            icon: 'L2LIcon',
          },
          {
            label: 'BUSD',
            href: '/exchange?coin=bnb&token=busd',
            icon: 'BUSDIcon',
          },
          {
            label: 'BETH',
            href: '/exchange?coin=bnb&token=beth',
            icon: 'BETHIcon',
          },
        ],
      },
      {
        label: 'ETH',
        href: '/exchange?coin=eth',
        icon: 'ETHIcon',
      },
      {
        label: 'USD',
        href: '/exchange?coin=usd',
        icon: 'USDIcon',
      },
      {
        label: 'XLM',
        href: '/exchange?coin=xlm',
        icon: 'XLMIcon',
      },
      {
        label: 'BTC',
        href: '/exchange?coin=btc',
        icon: 'BTCIcon',
      },
    ],
  },
  {
    label: 'Launch Pool',
    icon: 'LaunchPoolIcon',
    href: '/launch-pool',
    items: [
      {
        label: 'BNB',
        href: '/launch-pool',
        icon: 'BNB2LCIcon',
      },
      {
        label: 'BETH',
        href: '/launch-pool?token=beth',
        icon: 'BETH2LCIcon',
      },
      {
        label: 'BUSD',
        href: '/launch-pool?token=busd',
        icon: 'BUSD2LCIcon',
      },
    ],
  },
  {
    label: 'Yield Farming',
    icon: 'YieldFarmingIcon',
    href: '/yield-farming',
    items: [
      {
        label: 'BNB',
        href: '/yield-farming',
        icon: 'BNB2LCIcon',
      },
    ],
  },
  {
    label: 'Airdrops',
    icon: 'AirdropIcon',
    href: '/airdrops',
    items: [
      {
        label: '2LC',
        href: '/airdrops',
        icon: 'L2L2LCIcon',
      },
    ],
  },
  // {
  //   label: 'Address Book',
  //   icon: 'TicketIcon',
  //   href: '/address-book',
  // },
]

export default config
