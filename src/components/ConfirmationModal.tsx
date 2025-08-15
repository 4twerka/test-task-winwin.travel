import { IoClose } from 'react-icons/io5'

import { Button } from './Button'
import { Text } from './Text'

function ConfirmationModal({
	onClose,
	onCancel,
	onConfirm
}: {
	onClose: () => void
	onCancel: () => void
	onConfirm: () => void
}) {
	return (
		<div className="fixed z-60 inset-0 flex items-center justify-center backdrop-blur-md">
			<div className="bg-white w-[90%] shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl px-[2rem] py-[1.5rem] flex flex-col items-center gap-[7rem] relative mx-[1rem]">
				<button
					className="absolute top-[1rem] right-[1rem] text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					<IoClose size={30} />
				</button>

				<Text
					size="lg"
					className="text-center"
				>
					Do you want to apply new filter
				</Text>

				<div className="flex gap-[2rem]">
					<Button
						variant="secondary"
						onClick={onCancel}
					>
						Use old filter
					</Button>
					<Button
						variant="primary"
						onClick={onConfirm}
					>
						Apply new filter
					</Button>
				</div>
			</div>
		</div>
	)
}

export { ConfirmationModal }
