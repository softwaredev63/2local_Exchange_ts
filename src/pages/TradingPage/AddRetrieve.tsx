import React, { useState, useEffect } from 'react'
import { Button, Text, ToastContainer, Toast } from '@pancakeswap-libs/uikit'
import { Row, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useActiveWeb3React } from '../../hooks'
import { GreyCard } from '../../components/Card'
import api from '../../connectors/api'
import { Deposit, Withdraw } from '../../utils/trading'

const validNumeric = (d) => d == '.' || '1234567890'.indexOf(d) > -1;

export default function AddRetrieve() {
  const { account, library } = useActiveWeb3React();

  const [exchangeRate, setExchangeRate] = useState(0);
  const [valueBUSD, setValueBUSD] = useState<(number | undefined)>();
  const [value2LCT, setValue2LCT] = useState<(number | undefined)>();
  const [errors, setErrors] = useState<any>({});
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    api.fetchData('exchangeRate').then((d: any) => setExchangeRate(d))
  })

  const handleKeyPress = (e) => {
    if (!validNumeric(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

  }
  const handleBUSDChange = (e) => {

    const { value } = e.target
    
    setValueBUSD(value);
    setValue2LCT(value / exchangeRate);
    setErrors({})
  }

  const handle2LCTChange = (e) => {
    const { value } = e.target
    setValue2LCT(value);
    setValueBUSD(value * exchangeRate);
    setErrors({})
  }

  const handleClickDeposit = async () => {
    if (!account) {
      alert('Connect wallet!'); return;
    }

    const errs = {}
    if (!valueBUSD) errs['valueBUSD'] = 'Input BUSD amount';
    else if (valueBUSD < 10) errs['valueBUSD'] = 'BUSD amount should be greater than 10';
    setErrors(errs)
    if (Object.keys(errs).length > 0) return;

    try {
      await Deposit(library, account, valueBUSD);
      const now = Date.now();
      const successToast = {
        id: `id-${now}`,
        title: 'Deposit success',
        description: `${valueBUSD} BUSD was deposited successfully`,
        type: 'success',
      };

      setToasts((prevToasts) => [successToast, ...prevToasts]);

    } catch (e:any) {
      console.error(e)
      const now = Date.now();
      const errorToast = {
        id: `id-${now}`,
        title: 'Deposit error',
        description: e.message,
        type: 'danger',
      };

      setToasts((prevToasts) => [errorToast, ...prevToasts]);
    }
    return;
  }

  

  const handleClickWithdraw = async () => {
    if (!account) {
      alert('Connect wallet!'); return;
    }

    const errs = {}
    if (!value2LCT) errs['value2LCT'] = 'Input 2LCT amount'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return;

    try {
      await Withdraw(library, account, value2LCT);
      const now = Date.now();
      const successToast = {
        id: `id-${now}`,
        title: 'Withdraw success',
        description: `${value2LCT} 2LCT was withdrawn successfully`,
        type: 'success',
      };

      setToasts((prevToasts) => [successToast, ...prevToasts]);

    } catch (e:any) {
      console.error(e)
      const now = Date.now();
      const errorToast = {
        id: `id-${now}`,
        title: 'Withdraw error',
        description: e.message,
        type: 'danger',
      };

      setToasts((prevToasts) => [errorToast, ...prevToasts]);
    }
    return;
  }

  const handleRemoveToasts = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  return (
    <div>
      <GreyCard>
        <Row style={{ paddingLeft: 10 }}>
          <Text color="#333333" style={{ fontSize: 18, textAlign: "center" }}>Add Retrieve Trading Pool</Text>
        </Row>

        <Row style={{ padding: 10, paddingTop: 15 }}>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter amount BUSD" onKeyPress={handleKeyPress} onChange={handleBUSDChange} value={valueBUSD} isInvalid={!!errors.valueBUSD} />
            <InputGroup.Append>
              <InputGroup.Text>BUSD</InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              {errors.valueBUSD}
            </Form.Control.Feedback>
          </InputGroup>
        </Row>

        <Row style={{ padding: 10, paddingTop: 15 }}>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter amount 2LC-T" onKeyPress={handleKeyPress} onChange={handle2LCTChange} value={value2LCT} isInvalid={!!errors.value2LCT} />
            <InputGroup.Append>
              <InputGroup.Text>2LC-T</InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              {errors.value2LCT}
            </Form.Control.Feedback>
          </InputGroup>
        </Row>

        <Row style={{ padding: 10, marginTop: 15 }}>
          <Button variant="subtle" style={{ background: "#EC681C", width: "100%", fontSize: "16px", height: 60 }} onClick={handleClickDeposit}>Deposit</Button>
        </Row>
        <Row style={{ padding: 10 }}>
          <Button variant="subtle" style={{ background: "#FAC326", width: "100%", fontSize: "16px", height: 60 }} onClick={handleClickWithdraw}>Withdraw</Button>
        </Row>
      </GreyCard>
      <ToastContainer toasts={toasts} onRemove={handleRemoveToasts} />
    </div >
  )
}
