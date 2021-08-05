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
      // {
      //   label: "ETH",
      //   href: "/exchange?coin=eth",
      //   icon: "ETHIcon",
      // },
      // {
      //   label: "USD",
      //   href: "/exchange?coin=usd",
      //   icon: "USDIcon",
      // },
      // {
      //   label: "XLM",
      //   href: "/exchange?coin=xlm",
      //   icon: "XLMIcon",
      // },
      // {
      //   label: "BTC",
      //   href: "/exchange?coin=btc",
      //   icon: "BTCIcon",
      // },
    ],
  },
  {
    label: 'Pools',
    icon: 'LaunchPoolIcon',
    href: '/pools',
    items: [
      {
        label: 'Yield Farming',
        href: '/pools?type=yield',
        icon: 'BNB2LCIcon',
      },
      {
        label: 'Trading Pools',
        href: '/pools?type=trading',
        icon: 'BETH2LCIcon',
      },
      {
        label: 'Staking Pools',
        href: '/pools?type=staking',
        icon: 'BUSD2LCIcon',
      },
    ],
  },
  {
    label: 'Dapps',
    icon: 'YieldFarmingIcon',
    href: '/yield-farming',
    items: [
      {
        label: 'Multi-send',
        href: '/dapps?type=multisend',
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
        label: '2LC 2local',
        href: '/airdrops',
        icon: 'L2L2LCIcon',
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'DiamondMenuIcon',
    href: '/airdrops',
    items: [
      {
        label: '2LC 2local',
        href: '/airdrops',
        icon: 'DiamondIcon',
      },
    ],
  },
]

export default config
