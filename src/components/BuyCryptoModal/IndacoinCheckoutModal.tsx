import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { useIndacoinCheckoutModalOpen, useIndacoinCheckoutModalToggle } from '../../state/application/hooks'


export default function IndacoinCheckoutModal() {
	const indacoinCheckoutModalOpen = useIndacoinCheckoutModalOpen()
	const indacoinCheckoutModalToggle = useIndacoinCheckoutModalToggle()

	return (
		<Modal isOpen={indacoinCheckoutModalOpen} onDismiss={indacoinCheckoutModalToggle} minHeight={400} maxHeight={400}>
			<iframe src="https://indacoin.com/partner-widget/?partner=vaiyo" title="Indacoin Checkout" />
		</Modal>
	)
}