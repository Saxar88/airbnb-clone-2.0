'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
	return (
		<div className='w-full md:w-auto py-2 border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
			<div className='flex flex-row items-center justify-between'>
				<div className='px-6 text-sm font-semibold'>Anywhere</div>
				<div className='hidden sm:block flex-1 px-6 text-sm font-semibold text-center border-x-[1px]'>
					Any Week
				</div>
				<div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
					<div className='hidden sm:block'>Add Guests</div>
					<div className='p-2 bg-rose-500 text-white rounded-full'>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;