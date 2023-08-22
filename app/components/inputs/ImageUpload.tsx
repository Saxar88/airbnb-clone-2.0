'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset='l0xb5ibo'
			options={{ maxFiles: 1 }}>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className='relative flex flex-col justify-center items-center gap-4 p-20 text-neutral-600 border-dashed border-2 border-neutral-300 hover:opacity-70 transition cursor-pointer'>
						<TbPhotoPlus size={50} />
						<div className='text-lg font-semibold'>Click to upload</div>
						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image
									src={value}
									alt='Uploaded image'
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
