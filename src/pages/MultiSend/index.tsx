import React, { useEffect, useState } from 'react'
import { Container, Row, Card, Form, Col, Table, Button, Spinner, Modal, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { isAddress } from '@ethersproject/address';
import { Token } from '@overage69/pancake-sdk-v2';
import { useActiveWeb3React } from '../../hooks'
import { useCurrencyBalance, useTokenBalance } from '../../state/wallet/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { L2L, CAKE, UNI, BTCB, ETH } from '../../constants'
import { useTokenContract } from '../../hooks/useContract'
import MultisendToken from '../../utils/multisend'
import './style.css'

const networkURL = process.env.REACT_APP_EXPLORER_URL;

interface CSVDataItem {
    address: string;
    amount: number;
}

const tokens: Token[] = [L2L, ETH, CAKE, UNI, BTCB];

export default function MultiSendPage() {
    const { account, library } = useActiveWeb3React();
    // @ts-ignore
    const balanceBNB = useCurrencyBalance(account, useCurrency('ETH'));
    const userBnbBalance = balanceBNB?.toSignificant();

    const [token, setToken] = useState<Token>(tokens[0]);
    
    // @ts-ignore
    const tokenBalance = useTokenBalance(account, token);
    const userTokenBalance = tokenBalance?.toSignificant();

    const contract = useTokenContract(token.address, false)

    const [csvData, setCSVData] = useState<CSVDataItem[]>([]);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [tokenName, setTokenName] = useState();
    const [tokenSymbol, setTokenSymbol] = useState();
    const [tokenDecimals, setTokenDecimals] = useState();
    const [tokenTotalSupply, setTokenTotalSupply] = useState();
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultTxArray, setResultTxArray] = useState([]);
    const [resultError, setResultError] = useState();

    useEffect(() => {
        (async () => {
            if (!account || !contract) return;

            const name = await contract.name();
            const symbol = await contract.symbol();
            const decimals = await contract.decimals();
            const totalSupply = await contract.totalSupply();

            setTokenName(name);
            setTokenSymbol(symbol);
            setTokenDecimals(decimals);
            // @ts-ignore         
            setTokenTotalSupply(totalSupply / 10 ** decimals);
        })()
    }, [account, contract])

    const totalAmount = csvData.length > 0 ? csvData.map(d => d.amount).reduce((a, c) => a + c) : 0;

    const handleTokenSelect = (eventKey) => {
        const token = tokens.find(t => t.symbol === eventKey);
        setToken(token!);
    }

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            if (typeof (FileReader) !== "undefined") {
                const reader = new FileReader();

                const data: CSVDataItem[] = [];
                reader.onload = function (e1: any) {
                    const rows = e1.target.result.split('\n');

                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i]) {
                            const cells = rows[i].split(',');
                            if (cells.length > 1) {
                                const address = cells[0].trim();
                                const amount = parseFloat(cells[1].trim());
                                if (isAddress(address)) data.push({ address, amount });
                            }
                        }
                    }
                    setCSVData(data);
                    setSending(false);
                    setSent(false);
                }

                reader.readAsText(files[0]);

            } else {
                alert("This browser does not support HTML5.");
            }
        }
    }

    const handleSend = async () => {
        if (!account || !token) return;

        if (totalAmount > parseFloat(userTokenBalance!)) {
            alert('Insufficient token amount');
            return;
        }

        setSending(true);
        try {
            const txArray = await MultisendToken(library, token.address, account, csvData);
            setSent(true);

            // @ts-ignore
            setResultTxArray(txArray);
        } catch (error: any) {
            setResultError(error.message);
        }
        setSending(false);
        setShowResultModal(true);
    }

    const handleModalClose = () => {
        setShowResultModal(false);
    }

    return (
        <Container fluid>
            <h3 className="p-2">BEP20 & ERC20 Token Multisender</h3>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="m-auto">
                            Token information
                        </Col>
                        <Col className="text-right">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    <img src={`/images/2local/${token.symbol}.svg`} className="icon-token" alt={token.name} />{token.symbol}<img src="/images/2local/BEP20.svg" className="icon-bep20" alt="BEP20 token" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        tokens.map(t => <Dropdown.Item eventKey={t.symbol} onSelect={handleTokenSelect}><img className="icon-token" src={`/images/2local/${t.symbol}.svg`} alt={t.name}></img>{t.symbol}<img src="/images/2local/BEP20.svg" className="icon-bep20" alt="BEP20 token" /></Dropdown.Item>)
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Name:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control plaintext readOnly defaultValue={tokenName} />
                            </Col>
                            <Form.Label column sm="1">
                                Symbol:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control plaintext readOnly defaultValue={tokenSymbol} />
                            </Col>
                            <Form.Label column sm="1">
                                Decimals:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control plaintext readOnly defaultValue={tokenDecimals} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Address:
                            </Form.Label>
                            <Col sm="5" style={{ margin: 'auto' }}>
                                <a href={`${networkURL}/token/${token.address}`} target="_blank" rel="noreferrer">{token.address}</a>
                            </Col>
                            <Form.Label column sm="2">
                                Total Supply:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control plaintext readOnly defaultValue={tokenTotalSupply} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mt-3">
                <Card.Header>Account information</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Address:
                            </Form.Label>
                            <Col sm="5" style={{ margin: 'auto' }}>
                                <a href={`${networkURL}/address/${account}`} target="_blank" rel="noreferrer">{account}</a>
                            </Col>
                            <Form.Label column sm="1">
                                BNB:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control plaintext readOnly defaultValue={userBnbBalance} />
                            </Col>
                            <Form.Label column sm="1">
                                {tokenSymbol}:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control plaintext readOnly defaultValue={userTokenBalance} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mt-3">
                <Card.Header>Wallets information</Card.Header>
                <Card.Body>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Select CSV file:</Form.Label>
                        <Col sm="2">
                            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                        </Col>
                    </Form.Group>
                    <div className="wallets-table-wrapper">
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    csvData.map((d, i) => (
                                        <tr key={`tr-${d.address}`}>
                                            <td>{i + 1}</td>
                                            <td><a href={`${networkURL}/address/${d.address}`} target="_blank" rel="noreferrer">{d.address}</a></td>
                                            <td>{d.amount}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="text-right">
                        <span className="p-2">Total:&nbsp;<b>{totalAmount}</b></span>
                        <Button variant="primary" disabled={!account || csvData.length === 0 || sending} onClick={handleSend}>
                            {
                                sending && (<div>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />&nbsp;
                                    Sending...
                                </div>)
                            }
                            {!sending && 'Send'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <Modal size="lg" show={showResultModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{resultError ? 'Error occurred' : 'Transaction list'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resultError ?? (
                        resultTxArray.map((tx: any, i) => (
                            <div key={tx.transactionHash}>
                                <a href={`${networkURL}/tx/${tx.transactionHash}`} target="_blank" rel="noreferrer">{tx.transactionHash}</a>
                            </div>
                        ))
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}