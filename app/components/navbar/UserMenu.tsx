'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useSignUpModal from '@/app/hooks/useSignUpModal';
import useLogInModal from '@/app/hooks/useLogInModal';

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const signUpModal = useSignUpModal();
	const logInModal = useLogInModal();

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={() => {}}
					className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className='flex flex-row items-center gap-3 p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition cursor-pointer'>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className='absolute right-0 top-12 w-[40vw] md:w-3/4 bg-white text-sm overflow-hidden rounded-xl shadow-md'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label='My trips' />
								<MenuItem onClick={() => {}} label='My favorites' />
								<MenuItem onClick={() => {}} label='My reservations' />
								<MenuItem onClick={() => {}} label='My properties' />
								<MenuItem onClick={() => {}} label='Airbnb my home' />
								<hr />
								<MenuItem onClick={() => signOut()} label='Log out' />
							</>
						) : (
							<>
								<MenuItem onClick={signUpModal.onOpen} label='Sign up' />
								<MenuItem onClick={logInModal.onOpen} label='Log in' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
