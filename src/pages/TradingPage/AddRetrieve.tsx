import React, { useState } from 'react'
import Select from 'react-select';
import { Button, Text } from '@pancakeswap-libs/uikit'
import Row from '../../components/Row'
import { GreyCard } from '../../components/Card'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function AddRetrieve() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
        <GreyCard>
          <Row style={{paddingLeft:10}}>
            <Text color="#333333" style={{fontSize:18,textAlign:"center"}}><b>Add Retrieve Trading Pool</b></Text>
          </Row>
          <Row style={{padding:10,paddingTop:15}}>
            Lock Period &nbsp;&nbsp;
          </Row>
          <div style={{paddingLeft:10,paddingRight:10}}>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
              <Row style={{padding:10,paddingTop:15}}>
              Input &nbsp;&nbsp;
              </Row>
            <div style={{paddingLeft:10,paddingRight:10}}>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <Row style={{padding:10,paddingTop:15}}>
            Ouput &nbsp;&nbsp;
            </Row>
            <div style={{paddingLeft:10,paddingRight:10}}>
              <Select style={{height:60}}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>

          <Row style={{padding:10,paddingTop:30}}>
            <Button variant="subtle" style={{background:"#EC681C",width:"100%",fontSize:"17px", height:60}}><b>Unlock Wallet</b></Button>
          </Row>
          <Row style={{padding:10,paddingTop:15 }}>
            <Button variant="subtle" style={{background:"#FAC326",width:"100%",fontSize:"17px", height:60}}><b>Buy BUSD</b></Button>
          </Row>
        </GreyCard>
  )
}
