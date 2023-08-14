'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}
		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className='fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-neutral-800/70 outline-none focus:outline-none'>
				<div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full md:h-auto lg:h-auto my-6 mx-auto'>
					<div
						className={`h-full translate duration-300 ${
							showModal
								? 'translate-y-0 opacity-100'
								: 'translate-y-full opacity-0'
						}`}>
						<div className='relative flex flex-col w-full h-full lg:h-auto md:h-auto bg-white outline-none focus:outline-none border-0 rounded-lg shadow-lg translate'>
							<div className='relative flex items-center justify-center p-6 border-b-[1px] rounded-t'>
								<button
									onClick={handleClose}
									className='absolute left-9 p-1 border-0 hover:opacity-70 transition'>
									<IoMdClose size={18} />
								</button>
								<div className='text-lg font-semibold'>{title}</div>
							</div>
							<div className='relative flex-auto p-6'>{body}</div>
							<div className='flex flex-col gap-2 p-6'>
								<div className='flex flex-col items-center w-full gap-4'>
									{secondaryAction && secondaryActionLabel && (
										<Button
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}
											disabled={disabled}
											outline
										/>
									)}
									<Button
										label={actionLabel}
										onClick={handleSubmit}
										disabled={disabled}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
