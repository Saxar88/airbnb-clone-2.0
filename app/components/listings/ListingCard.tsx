'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    actionLabel?: string;
    actionId?: string;
    disabled?: boolean;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    actionLabel,
    actionId = '',
    disabled,
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) return;

            onAction?.(actionId);
        },
        [disabled, onAction, actionId]
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="group col-span-1 cursor-pointer"
        >
            <div className="flex flex-col w-full gap-2">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                    <Image
                        src={data.imageSrc}
                        alt="listing"
                        className="h-full w-full object-cover group-hover:scale-110 transition"
                        fill
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">${price}</div>
                    {!reservation && <div className="font-light">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default ListingCard;
