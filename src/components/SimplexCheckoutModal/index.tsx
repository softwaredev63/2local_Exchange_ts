import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import { useSimplexCheckoutModalOpen, useSimplexCheckoutModalToggle } from '../../state/application/hooks'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function SimplexCheckoutModal() {
  const simplexCheckoutModalOpen = useSimplexCheckoutModalOpen()
  const simplexCheckoutModalToggle = useSimplexCheckoutModalToggle()

  const formHTML = '<form id="simplex-form">\n' +
    '    <div id="checkout-element">\n' +
    '        <!-- checkout will be rendered here -->\n' +
    '    </div>\n' +
    '</form>'

  useEffect(() => {
    if (simplexCheckoutModalOpen) {
      setTimeout(() => {
        const params = {
          payment_id: '55d5241a-6354-445a-92f0-898c1b96f985'
        }
        // @ts-ignore
        window.Simplex.load(params, function (event) {
          console.log(event.type) // => 'checkoutLoadSucceeded'
        });
      }, 100)
    }
  }, [simplexCheckoutModalOpen])
  return (
    <Modal isOpen={simplexCheckoutModalOpen} onDismiss={simplexCheckoutModalToggle} minHeight={false} maxHeight={90}>
      <Wrapper>
        <div className="content" dangerouslySetInnerHTML={{__html: formHTML}} />
      </Wrapper>
    </Modal>
  )
}