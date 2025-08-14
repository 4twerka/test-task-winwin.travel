import { useState } from "react"
import { Button } from "@/components/Button"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { Modal } from "@/components/Modal";

export const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = () => {
		setIsOpen(prev => !prev);
	}

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<Button onClick={toggleOpen} variant="primary">Open Filters</Button>
			{/* {isOpen ? <ConfirmationModal /> : null} */}
			{isOpen ? <Modal onClose={() => setIsOpen(false)} /> : null}
		</section>
	)
}
