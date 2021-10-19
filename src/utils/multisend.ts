import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits, formatEther, parseEther } from '@ethersproject/units';
import { getContract } from './index';
import MultisendContractABI from '../constants/abis/MultisendContract.json';
import ERC20ABI from '../constants/abis/erc20';

const multisendContractAddress: string = process.env.REACT_APP_MULTISEND_CONTRACT_ADDRESS!;

export async function MultisendToken(provider, tokenAddress, userAddress, sendData) {

    const addresses = sendData.map(d => d.address);
    const amounts = sendData.map(d => d.amount);

    try {
        // 1. Transfer total amounts for Multisender contract to send
        const tokenContract = getContract(tokenAddress, ERC20ABI, provider, userAddress);
        const multisendContract = getContract(multisendContractAddress, MultisendContractABI, provider, userAddress);

        const userTokenBalance = await tokenContract.balanceOf(userAddress);
        const decimal = await tokenContract.decimals();
        const tokenDecimals = BigNumber.from(decimal);

        const totalAmount = amounts.reduce((a, c) => a + c);
        const totalAmountToSend = BigNumber.from(totalAmount).mul(BigNumber.from(10).pow(tokenDecimals)).toHexString();

        if (userTokenBalance / (10 ** decimal) < totalAmount) throw new Error('Insufficient token balance');

        const gasPrice = await provider.getGasPrice();

        const txSendTotalAmount = await tokenContract.transfer(multisendContractAddress, totalAmountToSend, {
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
            if (pageAddresses.length > 0) {
                const pageAmountsToSend = amountsToSend.slice(i * pageSize, (i + 1) * pageSize);

                const gas = await multisendContract.estimateGas.bulkSendTokens(tokenAddress, pageAddresses, pageAmountsToSend, {
                    from: userAddress
                });

                const sendData: any = {
                    from: userAddress,
                    // gas: gas,
                    gasPrice,
                };

                // Set contract owner fee as payable amount
                if (gas.lt(gasForSingleTransaction.mul(pageAddresses.length))) sendData.value = parseUnits(`${gasForSingleTransaction.mul(pageAddresses.length).sub(gas).toNumber()}`, 'gwei')

                const txPageBulkSend = await multisendContract.bulkSendTokens(tokenAddress, pageAddresses, pageAmountsToSend, sendData);
                txArray.push(
                    await txPageBulkSend.wait()
                );
            }
        }
        return txArray;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function MultisendBNB(provider, userAddress, sendData) {
    const addresses = sendData.map(d => d.address);
    const amounts = sendData.map(d => d.amount);

    const totalAmount = amounts.reduce((a, c) => a + c);
        
    try {
        // Check userBalance is sufficient to send BNB        
        const userBalance = formatEther(await provider.getBalance(userAddress));

        if (userBalance < totalAmount) throw new Error('Insufficient balance');

        const gasPrice = await provider.getGasPrice();

        // Get gas amount for single transaction of max amount
        const maxAmount = Math.max(...amounts);
        const maxAmountToSend = parseEther(`${maxAmount}`);

        const gasForSingleTransaction = await provider.estimateGas({ from: userAddress, to: addresses[0], value: maxAmountToSend }); 
        // console.log('>>>>> gasForSingleTransaction', gasForSingleTransaction)

        // Send amounts to receivers from Multisender contract
        const multisendContract = getContract(multisendContractAddress, MultisendContractABI, provider, userAddress);
        const amountsToSend = amounts.map(a => parseEther(`${a}`));

        const pageSize = 500;
        const txArray: any[] = [];
        for (let i = 0; i <= Math.floor(addresses.length / pageSize); i++) {
            const pageAddresses = addresses.slice(i * pageSize, (i + 1) * pageSize);
            const pageAmountsToSend = amountsToSend.slice(i * pageSize, (i + 1) * pageSize);
            let value = pageAmountsToSend.reduce((a, c) => a.add(c));

            const gas = await multisendContract.estimateGas.bulkSendBNB(pageAddresses, pageAmountsToSend, {
                from: userAddress,
                value
            });

            // console.log('>>>>>> Gas Amount', gas);

            const sendData: any = {
                from: userAddress,
                // gas: gas,
                gasPrice
            };

            // Set contract owner fee as payable amount
            if (gas.lt(gasForSingleTransaction.mul(pageAddresses.length)))
                value = value.add(gasForSingleTransaction.mul(pageAddresses.length).sub(gas))

            sendData.value = value;
            const txPageBulkSend = await multisendContract.bulkSendBNB(pageAddresses, pageAmountsToSend, sendData);
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