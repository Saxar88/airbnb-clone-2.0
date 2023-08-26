'use client';

import { useRouter } from 'next/navigation';

import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = 'No exact matches',
	subtitle = 'Try changing or removing some of your filters',
	showReset,
}) => {
	const router = useRouter();

	return (
		<div className='flex flex-col justify-center items-center gap-2 h-[60vh]'>
			<Heading title={title} subtitle={subtitle} center />
			<div className='w-48 mt-4'>
				{showReset && (
					<Button
						onClick={() => router.push('/')}
						label='Remove all filters'
						outline
					/>
				)}
			</div>
		</div>
	);
};

export default EmptyState;
