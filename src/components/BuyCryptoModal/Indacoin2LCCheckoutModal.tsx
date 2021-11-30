import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { useIndacoin2LCCheckoutModalOpen, useIndacoin2LCCheckoutModalToggle } from '../../state/application/hooks'


export default function Indacoin2LCCheckoutModal() {
	const indacoin2LCCheckoutModalOpen = useIndacoin2LCCheckoutModalOpen()
	const indacoin2LCCheckoutModalToggle = useIndacoin2LCCheckoutModalToggle()

	return (
		<Modal isOpen={indacoin2LCCheckoutModalOpen} onDismiss={indacoin2LCCheckoutModalToggle} minHeight={51} maxHeight={400}>
			<iframe src="https://indacoin.com/partner-widget/?partner=2LC&cur_to=2LC" title="2LC Indacoin Checkout" />
		</Modal>
	)
}