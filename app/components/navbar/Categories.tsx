'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCandleHolder,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const categories = [
	{
		label: 'Luxe',
		icon: IoDiamond,
		description: 'This property is luxurious!',
	},
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to the beach!',
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property has camping activities!',
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills!',
	},
	{
		label: 'Historical homes',
		icon: GiCandleHolder,
		description: 'This property is an old building!',
	},
	{
		label: 'Countryside',
		icon: TbMountain,
		description: 'This property is in the countryside!',
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This property has a pool!',
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is on an island!',
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is close to a lake!',
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property has skiing activities!',
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is in a castle!',
	},
	{
		label: 'Arctic',
		icon: BsSnow,
		description: 'This property is in an arctic area!',
	},
	{
		label: 'Cave',
		icon: GiCaveEntrance,
		description: 'This property is in a cave!',
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is in the desert!',
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is in a barn!',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern!',
	},
];

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();

	const isMainPage = pathname === '/';

	if (!isMainPage) {
		return null;
	}

	return (
		<Container>
			<div className='flex flex-row items-center justify-between pt-4 overflow-x-auto'>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						icon={item.icon}
						selected={category === item.label}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
