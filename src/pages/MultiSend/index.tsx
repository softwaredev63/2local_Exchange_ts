import React, { useState } from 'react'
import { Container, Row, Card, Form, Col, Table, Button, Spinner, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { isAddress } from '@ethersproject/address';
import { Token, Currency } from '@overage69/pancake-sdk-v2';
import { useActiveWeb3React } from '../../hooks'
import { L2L, CAKE, UNI, BTCB, ETH } from '../../constants'
import {MultisendToken, MultisendBNB} from '../../utils/multisend'
import TokenList from '../../components/TokenList'
import './style.css'

const networkURL = process.env.REACT_APP_EXPLORER_URL;

interface CSVDataItem {
    address: string;
    amount: number;
}

const tokens: Token[] = [L2L, ETH, CAKE, UNI, BTCB];

export default function MultiSendPage() {
    const { account, library } = useActiveWeb3React();

    const [token, setToken] = useState<(Token | Currency)>();

    const [csvData, setCSVData] = useState<CSVDataItem[]>([]);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultTxArray, setResultTxArray] = useState([]);
    const [resultError, setResultError] = useState();

    const totalAmount = csvData.length > 0 ? csvData.map(d => d.amount).reduce((a, c) => a + c) : 0;

    const handleTokenSelect = (token) => {
        setToken(token);
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


        setSending(true);
        try {
            let txArray;
            if (token instanceof Token) {
                txArray = await MultisendToken(library, token.address, account, csvData);
            } else {
                txArray = await MultisendBNB(library, account, csvData);
            }
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

    const symbolName = token instanceof Token ? token.symbol : (token !== undefined ? 'BNB' : '');

    return (
        <Container fluid>
            <h3 className="p-2">BEP20 & ERC20 Token Multisender</h3>

            <Row className="mt-3">
                <Col sm="4">
                    <TokenList
                        handleItemClick={handleTokenSelect}
                    />
                </Col>
                <Col sm="8">
                    <Card>
                        <Card.Header>Wallets information</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Select CSV file:</Form.Label>
                                <Col sm="9" className="m-auto">
                                    <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                                </Col>
                            </Form.Group>

                            <div className="wallets-table-wrapper">
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '80px' }}>#</th>
                                            <th>Address</th>
                                            <th style={{ width: '150px' }}>Amount</th>
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
                                <span className="p-2">Total:&nbsp;<b>{parseFloat(totalAmount.toFixed(5))} {symbolName}</b></span>
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
                </Col>
            </Row>

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