import { formatEther, parseEther } from '@ethersproject/units';
import { getContract } from './index';
import TradingContractABI from '../constants/abis/TradingContract.json';
import BUSDABI from '../constants/abis/BUSD.json';


export async function Deposit(provider, userAddress, amount/* BUSD amount */) {
    const tradingContractAddress: string = process.env.REACT_APP_TRADING_CONTRACT_ADDRESS!;
    const busdAddress: string = process.env.REACT_APP_BUSD_ADDRESS!;

    const depositAmount = parseEther(`${amount}`); 

    // 1. First approve BUSD
    const busdContract = getContract(busdAddress, BUSDABI, provider, userAddress);
    const txApprove = await busdContract.approve(tradingContractAddress, depositAmount);
    await txApprove.wait();

    // 2. Next deposit BUSD
    const tradingContract = getContract(tradingContractAddress, TradingContractABI, provider, userAddress);

    const txDeposit = await tradingContract.deposit(depositAmount, {
        from: userAddress
    });
    return await txDeposit.wait();
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

export async function Balance2LCT(provider, userAddress) {
    const tradingContractAddress: string = process.env.REACT_APP_TRADING_CONTRACT_ADDRESS!;

    const tradingContract = getContract(tradingContractAddress, TradingContractABI, provider, userAddress);
    const balance = await tradingContract.userInfo(userAddress);
    return parseFloat(formatEther(balance));   
}