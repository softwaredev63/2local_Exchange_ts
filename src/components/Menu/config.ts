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
            label: 'ETH',
            href: '/?coin=BNB&token=ETH',
            icon: 'ETHIcon',
            disabled: false,
          },
          {
            label: 'CAKE',
            href: '/?coin=BNB&token=CAKE',
            icon: 'CAKEIcon',
            disabled: false,
          },
          {
            label: 'UNI',
            href: '/?coin=BNB&token=UNI',
            icon: 'UNIIcon',
            disabled: false,
          },
          {
            label: 'BTCB',
            href: '/?coin=BNB&token=BTCB',
            icon: 'BTCIcon',
            disabled: false,
          },
        ],
      },
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
        disabled: false,
      },
      {
        label: 'Yield Farming',
        href: 'https://farms.2local.io/',
        icon: 'BNB2LCIcon',
        disabled: false,
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
    label: 'Rewards',
    icon: 'AirdropIcon',
    href: '/airdrops',
    items: [
      {
        label: 'Airdrops',
        href: '/airdrops',
        icon: 'L2L2LCIcon',
        disabled: true,
      },
      {
        label: 'Lottery',
        href: '/lottery',
        icon: 'L2L2LCIcon',
        disabled: true,
      },
      {
        label: 'Prediction',
        href: '/prediction',
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
        label: 'NFT Exchange',
        href: '/nft',
        icon: 'DiamondIcon',
        disabled: true,
      },
    ],
  },
]

export default config
