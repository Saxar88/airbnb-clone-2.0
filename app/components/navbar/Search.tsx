"use client";

import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}

		return "Anywhere";
	}, [locationValue, getByValue]);

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			let diff = differenceInDays(end, start);

			if (diff === 0) diff = 1;

			return `${diff === 1 ? "1 Day" : diff + " Days"}`;
		}

		return "Any Week";
	}, [startDate, endDate]);

	const guestsLabel = useMemo(() => {
		if (guestCount) {
			return `${
				parseInt(guestCount, 10) === 1 ? "1 Guest" : guestCount + " Guests"
			}`;
		}

		return "Add Guests";
	}, [guestCount]);

	return (
		<div
			onClick={searchModal.onOpen}
			className="w-full md:w-auto py-2 border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row items-center justify-between">
				<div className="px-6 text-sm font-semibold">{locationLabel}</div>
				<div className="hidden sm:block flex-1 px-6 text-sm font-semibold text-center border-x-[1px]">
					{durationLabel}
				</div>
				<div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
					<div className="hidden sm:block">{guestsLabel}</div>
					<div className="p-2 bg-[#ff385c] text-white rounded-full">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
