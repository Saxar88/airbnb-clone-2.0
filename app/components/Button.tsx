'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative w-full disabled:opacity-70 disabled:cursor-not-allowed border-[1px] rounded-lg hover:opacity-80 transition ${
				outline
					? 'bg-white text-black border-black'
					: 'bg-rose-500 text-white border-rose-500'
			} ${small ? 'py-1 text-sm font-light' : 'py-3 text-md font-semibold'}`}>
			{Icon && <Icon size={24} className='absolute left-4 top-3' />}
			{label}
		</button>
	);
};

export default Button;
