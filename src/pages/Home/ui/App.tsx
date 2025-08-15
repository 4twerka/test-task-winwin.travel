import { useState } from 'react'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useFilterStore } from '@/store/UseFilterStore'

export const App = () => {
	const [isOpen, setIsOpen] = useState(false)
	const filters = useFilterStore(state => state.filters)

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			<h1 className="text-4xl text-gray-600 mb-6">
				WinWinTravel frontend test task
			</h1>
			<Button
				onClick={() => setIsOpen(true)}
				variant="primary"
			>
				Open Filters
			</Button>

			<pre className="mt-8 bg-gray-100 p-4 rounded-lg">
				{JSON.stringify(filters, null, 2)}
			</pre>

			{isOpen && <Modal onClose={() => setIsOpen(false)} />}
		</section>
	)
}
