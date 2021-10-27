export const BASE_URL = 'https://exchange.2local.io'

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol?: string, tokenDecimals?: number) => {
  let tokenAdded = null
  const { ethereum } = window
  if(ethereum) {
    // @ts-ignore
    tokenAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: `${BASE_URL}/images/coins/${tokenSymbol}.svg`,
        },
      },
    })
  }

  return tokenAdded
}
