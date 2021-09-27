import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import Modal from '../Modal'
import { useSimplexCheckoutModalOpen, useSimplexCheckoutModalToggle } from '../../state/application/hooks'
import {loadSimplexForm, unloadSimplexForm} from '../../simplex-form-script'
import useParsedQueryString from '../../hooks/useParsedQueryString'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 10px;
  width: 100%;
  min-height: 150px;
`

export default function SimplexCheckoutModal() {
  const simplexCheckoutModalOpen = useSimplexCheckoutModalOpen()
  const simplexCheckoutModalToggle = useSimplexCheckoutModalToggle()
  const history = useHistory();
  const parsedQs = useParsedQueryString()
  const [isSimplex, setIsSimplex] = useState(false)
  const [isOpen, setIsOpen] = useState(simplexCheckoutModalOpen)

  useEffect(() => {
    if (parsedQs.simplex === 'true') {
      setIsSimplex(true)
      setIsOpen(true)
    }
  }, [parsedQs])

  const redirect = () => {
    setIsSimplex(false)
    setIsOpen(false)
    history.push('/')
  }

  const [loadedSimplexFormScript, setLoadedSimpledFormScript] = useState(false);

  useEffect(() => {
    if (isOpen && !loadedSimplexFormScript) {
      loadSimplexForm(() => {
        setLoadedSimpledFormScript(true);
        // @ts-ignore
        const simplex = window.simplex; 
        const promise = simplex.createForm();
        promise.then(function (data) {
          const currencies = data.supportedCryptoCurrencies;
          simplex.updateCryptoCurrency('BNB');

          // @ts-ignore
          // console.log(document.querySelector('#checkout-element > iframe').contentWindow.document.querySelector('#simplex-iframe-form > div.powered-logo.justify-content-end > div > img'));
        });

        simplex.on('submit', function (event) {
          // $('#simplex-form').removeClass('width-500');
          // $('#checkout-element').removeClass('width-450');
        });
      });
    }

    if (!isOpen && loadedSimplexFormScript) return unloadSimplexForm(() => {
      setLoadedSimpledFormScript(false);
    });
    return undefined;
  }, [isOpen, loadedSimplexFormScript])

  const formHTML = '<form id="simplex-form">\n' +
    '    <div id="checkout-element">\n' +
    '        <!-- checkout will be rendered here -->\n' +
    '    </div>\n' +
    '</form>'


  return (
    <Modal isOpen={isOpen} onDismiss={isSimplex ? redirect : simplexCheckoutModalToggle} minHeight={false} maxHeight={90}>
      <Wrapper>
        <div className="content" dangerouslySetInnerHTML={{ __html: formHTML }} />
      </Wrapper>
    </Modal>
  )
}