import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { getContract } from './index';
import MultisenderABI from '../constants/abis/Multisendor.json';
import ERC20ABI from '../constants/abis/erc20';

export default async function MultisendToken(provider, tokenAddress, userAddress, sendData) {
    const multiSenderAddress:string = process.env.REACT_APP_MULTISENDER_ADDRESS!;
    
    const addresses = sendData.map(d => d.address);
    const amounts = sendData.map(d => d.amount);

    try {
        // 1. Transfer total amounts for Multisender contract to send
        const tokenContract = getContract(tokenAddress, ERC20ABI, provider, userAddress); 
        const multiSenderContract = getContract(multiSenderAddress, MultisenderABI, provider, userAddress);

        const userTokenBalance = await tokenContract.balanceOf(userAddress);
        const decimal = await tokenContract.decimals(); 
        const tokenDecimals = BigNumber.from(decimal); 

        const totalAmount = amounts.reduce((a, c) => a + c); 
        const totalAmountToSend = BigNumber.from(totalAmount).mul(BigNumber.from(10).pow(tokenDecimals)).toHexString();
        
        if (userTokenBalance / (10 ** decimal) < totalAmount) throw new Error('Insufficient token balance'); 
        
        const gasPrice = await provider.getGasPrice(); 

        const txSendTotalAmount = await tokenContract.transfer(multiSenderAddress, totalAmountToSend, {
            from: userAddress,
            // gas: gas,
            gasPrice,
        });
        await txSendTotalAmount.wait();
        
        // Get gas amount for single transaction of max amount
        const maxAmount = Math.max(...amounts);
        const maxAmountToSend = BigNumber.from(maxAmount).mul(BigNumber.from(10).pow(tokenDecimals)).toHexString();

        const gasForSingleTransaction = await tokenContract.estimateGas.transfer(addresses[0], maxAmountToSend, {
            from: userAddress
        }); 

        // 2. Send amounts to receivers from Multisender contract
        const amountsToSend = amounts.map(a => BigNumber.from(a).mul(BigNumber.from(10).pow(tokenDecimals)));

        const pageSize = 500;
        const txArray: any[] = [];
        for (let i = 0; i <= Math.floor(addresses.length / pageSize); i++) {
            const pageAddresses = addresses.slice(i * pageSize, (i + 1) * pageSize);
            const pageAmountsToSend = amountsToSend.slice(i * pageSize, (i + 1) * pageSize);

            const gas = await multiSenderContract.estimateGas.bulkSendTokens(tokenAddress, pageAddresses, pageAmountsToSend, {
                from: userAddress
            });
            
            const sendData: any = {
                from: userAddress,
                // gas: gas,
                gasPrice,
            };

            // Set contract owner fee as payable amount
            if (gas < gasForSingleTransaction.mul(pageAddresses.length)) sendData.value = parseUnits(gasForSingleTransaction.mul(pageAddresses.length).sub(gas).toHexString(), 'gwei')
            
            const txPageBulkSend = await multiSenderContract.bulkSendTokens(tokenAddress, pageAddresses, pageAmountsToSend, sendData);
            txArray.push(
                await txPageBulkSend.wait()
            );
        }
        return txArray;
    } catch (e) {
        console.error(e);
        throw e;
    }
}