import React, { useMemo } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Currency } from '@overage69/pancake-sdk-v2'
import { useActiveWeb3React } from '../../hooks'
import { useAllTokens } from '../../hooks/Tokens'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencyLogo from '../CurrencyLogo';
import Loader from '../Loader'

import './style.css'

export default function TokenList({handleItemClick}) {
    const allTokens = useAllTokens(); 

    const sortedTokens = useMemo(() => {
        return [Currency.ETHER, ...Object.values(allTokens)];
    }, [allTokens])

    return (
        <ListGroup defaultActiveKey="#link1">
            {
                sortedTokens.map(t => <TokenItem token={t} handleItemClick={handleItemClick} />)
            }
        </ListGroup>
    )
}

function TokenItem({token, handleItemClick}) {
    const { account, chainId } = useActiveWeb3React()
    const balance = useCurrencyBalance(account ?? undefined, token)
    return (
        <ListGroup.Item action eventKey={token.symbol} onClick={() => handleItemClick(token)}>
            <CurrencyLogo currency={token} size="24px" />
            <span className="token-symbol">{token.symbol}</span>
            <img src="/images/2local/BEP20.svg" className="icon-bep20" alt="BEP20 token" />
            <span className="token-balance">{balance ? (<span>{balance.toSignificant(4)}</span>) : account ? <Loader /> : null}</span>
        </ListGroup.Item>        
    )
}