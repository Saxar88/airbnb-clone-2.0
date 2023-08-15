'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type,
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) => {
	return (
		<div className='relative w-full'>
			{formatPrice && (
				<BiDollar
					size={24}
					className='absolute top-5 left-2 text-neutral-700'
				/>
			)}
			<input
				id={id}
				type={type}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=' '
				className={`peer w-full p-4 pt-6 bg-white font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
					formatPrice ? 'pl-9' : 'pl-4'
				} ${
					errors[id]
						? 'border-rose-500 focus:border-rose-500'
						: 'border-neutral-300 focus:border-black'
				}`}
			/>
			<label
				className={`absolute top-5 z-10 origin-[0] text-md transform -translate-y-3 duration-150 ${
					formatPrice ? 'left-9' : 'left-4'
				} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
					errors[id] ? 'text-rose-500' : 'text-zinc-400'
				}`}>
				{label}
			</label>
		</div>
	);
};

export default Input;
