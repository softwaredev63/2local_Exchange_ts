import React, { useState, useEffect } from 'react'
import { Button, Text, ToastContainer, Toast } from '@pancakeswap-libs/uikit'
import { Row, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useActiveWeb3React } from '../../hooks'
import { GreyCard } from '../../components/Card'
import api from '../../connectors/api'
import Deposit from '../../utils/trading'

const periodOptions = [
  { value: 30, label: '30 Days' },
  { value: 60, label: '60 Days' },
  { value: 90, label: '90 Days' },
  { value: 180, label: '180 Days' },
  { value: 360, label: '360 Days' },
];

export default function AddRetrieve() {
  const { account, library } = useActiveWeb3React();

  const [periodOption, setPeriodOption] = useState(-1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [valueBUSD, setValueBUSD] = useState<(number | undefined)>();
  const [value2LCT, setValue2LCT] = useState<(number | undefined)>();
  const [errors, setErrors] = useState<any>({});
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    api.fetchData('exchangeRate').then((d: any) => setExchangeRate(d))
  })

  const handlePeriodChange = (e) => {
    setPeriodOption(e.target.value)
    setErrors({ ...errors, periodOption: null })
  }

  const handleBUSDChange = (e) => {
    const value = e.target.value
    setValueBUSD(value);
    setValue2LCT(value / exchangeRate);
    setErrors({ ...errors, valueBUSD: null })
  }

  const handleClickDeposit = async () => {
    if (!account) {
      alert('Connect wallet!'); return;
    }

    const errs = {}
    if (periodOption == -1) errs['periodOption'] = 'Select lock period'
    if (!valueBUSD) errs['valueBUSD'] = 'Input BUSD amount'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return;

    try {
      await Deposit(library, account, valueBUSD, periodOption);
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
          <InputGroup className="w-100">
            <Form.Control as="select" placeholder="Lock Period" isInvalid={!!errors.periodOption} onChange={handlePeriodChange}>
              <option value={-1} key={-1}>Lock Period</option>
              {periodOptions.map(option => <option key={`period-option-${option.value}`} value={option.value}>{option.label}</option>)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.periodOption}
            </Form.Control.Feedback>
          </InputGroup>
        </Row>

        <Row style={{ padding: 10, paddingTop: 15 }}>
          <InputGroup>
            <Form.Control type="text" placeholder="Input" onChange={handleBUSDChange} isInvalid={!!errors.valueBUSD} />
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
            <Form.Control type="text" placeholder="Output" value={value2LCT} />
            <InputGroup.Append>
              <InputGroup.Text>2LC-T</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Row>

        <Row style={{ padding: 10, marginTop: 15 }}>
          <Button variant="subtle" style={{ background: "#EC681C", width: "100%", fontSize: "16px", height: 60 }} onClick={handleClickDeposit}>Deposit</Button>
        </Row>
        <Row style={{ padding: 10 }}>
          <Button variant="subtle" style={{ background: "#FAC326", width: "100%", fontSize: "16px", height: 60 }}>Buy BUSD</Button>
        </Row>
      </GreyCard>
      <ToastContainer toasts={toasts} onRemove={handleRemoveToasts} />
    </div >
  )
}
