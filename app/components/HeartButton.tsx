'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const hasFavorited = false;
	const toggleFavorite = () => {};

	return (
		<div
			onClick={toggleFavorite}
			className='relative hover:opacity-80 transition cursor-pointer'>
			<AiOutlineHeart
				size={28}
				className='absolute -top-[2px] -right-[2px] fill-white'
			/>
			<AiFillHeart
				size={24}
				className={hasFavorited ? 'fill-[#ff385c]' : 'fill-neutral-500/70'}
			/>
		</div>
	);
};

export default HeartButton;
