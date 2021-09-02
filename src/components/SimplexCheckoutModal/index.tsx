import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import { useSimplexCheckoutModalOpen, useSimplexCheckoutModalToggle } from '../../state/application/hooks'
import {loadSimplexForm, unloadSimplexForm} from '../../simplex-form-script'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 10px;
  width: 100%;
`

export default function SimplexCheckoutModal() {
  const simplexCheckoutModalOpen = useSimplexCheckoutModalOpen()
  const simplexCheckoutModalToggle = useSimplexCheckoutModalToggle()

  const [loadedSimplexFormScript, setLoadedSimpledFormScript] = useState(false);

  useEffect(() => {
    if (simplexCheckoutModalOpen && !loadedSimplexFormScript) {
      loadSimplexForm(() => {
        setLoadedSimpledFormScript(true);
        // @ts-ignore
        const simplex = window.simplex; 
        const promise = simplex.createForm();
        promise.then(function (data) {
          const currencies = data.supportedCryptoCurrencies;
          simplex.updateCryptoCurrency('BNB');
        });

        simplex.on('submit', function (event) {
          // $('#simplex-form').removeClass('width-500');
          // $('#checkout-element').removeClass('width-450');
        });
      });
    }

    if (!simplexCheckoutModalOpen && loadedSimplexFormScript) return unloadSimplexForm(() => {
      setLoadedSimpledFormScript(false);
    });
    return undefined;
  }, [simplexCheckoutModalOpen, loadedSimplexFormScript])

  const formHTML = '<form id="simplex-form">\n' +
    '    <div id="checkout-element">\n' +
    '        <!-- checkout will be rendered here -->\n' +
    '    </div>\n' +
    '</form>'


  return (
    <Modal isOpen={simplexCheckoutModalOpen} onDismiss={simplexCheckoutModalToggle} minHeight={false} maxHeight={90}>
      <Wrapper>
        <div className="content" dangerouslySetInnerHTML={{ __html: formHTML }} />
      </Wrapper>
    </Modal>
  )
}