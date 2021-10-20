import { parseEther } from '@ethersproject/units';
import { getContract } from './index';
import TradingContractABI from '../constants/abis/TradingContract.json';

export async function Deposit(provider, userAddress, amount/* BUSD amount */) {
    const tradingContractAddress: string = process.env.REACT_APP_TRADING_CONTRACT_ADDRESS!;

    const tradingContract = getContract(tradingContractAddress, TradingContractABI, provider, userAddress);

    const depositAmount = parseEther(`${amount}`); 

    const txDeposit = await tradingContract.deposit(depositAmount, {
        from: userAddress
    });
    return await txDeposit.wait()
}

export async function Withdraw(provider, userAddress, amount/* 2LCT amount */) {
    const tradingContractAddress: string = process.env.REACT_APP_TRADING_CONTRACT_ADDRESS!;

    const tradingContract = getContract(tradingContractAddress, TradingContractABI, provider, userAddress);

    const withdrawAmount = parseEther(`${amount}`); 

    const txDeposit = await tradingContract.withdraw(withdrawAmount, {
        from: userAddress
    });
    return await txDeposit.wait()
}