import { parseEther } from '@ethersproject/units';
import { getContract } from './index';
import TradingContractABI from '../constants/abis/TradingContract.json';

export default async function Deposit(provider, userAddress, amount/* BUSD amount */) {
    const tradingContractAddress: string = process.env.REACT_APP_TRADING_CONTRACT_ADDRESS!;

    const tradingContract = getContract(tradingContractAddress, TradingContractABI, provider, userAddress);

    const sendAmount = parseEther(`${amount}`); 

    const txDeposit = await tradingContract.deposit(sendAmount, {
        from: userAddress
    });
    return await txDeposit.wait()
}