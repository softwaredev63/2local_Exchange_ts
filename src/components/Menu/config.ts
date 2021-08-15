import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: '/',
    items: [
      {
        label: 'BNB',
        href: '/',
        icon: 'BNBIcon',
        items: [
          {
            label: '2LC',
            href: '/?coin=BNB&token=2LC',
            icon: 'L2LIcon',
            disabled: false,
          },
          {
            label: 'BUSD',
            href: '/?coin=BNB&token=BUSD',
            icon: 'BUSDIcon',
            disabled: true,
          },
          {
            label: 'BETH',
            href: '/?coin=BNB&token=BETH',
            icon: 'BETHIcon',
            disabled: true,
          },
        ],
      },
      // {
      //   label: "ETH",
      //   href: "/?coin=eth",
      //   icon: "ETHIcon",
      // },
      // {
      //   label: "USD",
      //   href: "/?coin=usd",
      //   icon: "USDIcon",
      // },
      // {
      //   label: "XLM",
      //   href: "/?coin=xlm",
      //   icon: "XLMIcon",
      // },
      // {
      //   label: "BTC",
      //   href: "/?coin=btc",
      //   icon: "BTCIcon",
      // },
    ],
  },
  {
    label: 'Pools',
    icon: 'LaunchPoolIcon',
    href: 'staking',
    items: [
      {
        label: 'Liquidity 2LC-LP',
        href: '/pool',
        icon: 'BNB2LCIcon',
        disabled: true,
      },
      {
        label: 'Yield Farming',
        href: 'https://farms.2local.io/',
        icon: 'BNB2LCIcon',
        disabled: true,
      },
      {
        label: 'Trading Pools',
        href: 'https://trading.2local.io/',
        icon: 'BETH2LCIcon',
        disabled: true,
      },
      {
        label: 'Staking Pools',
        href: 'https://staking.2local.io/',
        icon: 'BUSD2LCIcon',
        disabled: true,
      },
    ],
  },
  {
    label: 'Dapps',
    icon: 'YieldFarmingIcon',
    href: 'dapp',
    items: [
      {
        label: 'Multi-send',
        href: 'https://msend.2local.io/',
        icon: 'BNB2LCIcon',
        disabled: true,
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
        disabled: true,
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'DiamondMenuIcon',
    href: '/nft',
    items: [
      {
        label: '2LC 2local',
        href: '/nft',
        icon: 'DiamondIcon',
        disabled: true,
      },
    ],
  },
]

export default config
