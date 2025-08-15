import { type ChangeEventHandler, useState } from 'react'

interface CheckBoxProps {
	checked?: boolean
	defaultChecked?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
	className?: string
}

const CheckBox = ({
	checked: controlledChecked,
	defaultChecked = false,
	onChange,
	className = ''
}: CheckBoxProps) => {
	const [internalChecked, setInternalChecked] = useState(defaultChecked)

	const isControlled = controlledChecked !== undefined
	const isChecked = isControlled ? controlledChecked : internalChecked

	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		if (!isControlled) {
			setInternalChecked(e.target.checked)
		}
		onChange?.(e)
	}

	return (
		<label className={`inline-flex items-center cursor-pointer ${className}`}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={handleChange}
				className="hidden"
			/>
			<span
				className={`
                    w-6 h-6 flex items-center justify-center
                    border-2 rounded-sm transition-colors duration-200
                    ${
											isChecked
												? 'bg-[#31393C] border-[#31393C]'
												: 'bg-white border-gray-400 hover:border-[#31393C] hover:bg-[#F4F4F4]'
										}
                `}
			>
				{isChecked && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="white"
						className="w-4 h-4"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</span>
		</label>
	)
}

export { CheckBox }
