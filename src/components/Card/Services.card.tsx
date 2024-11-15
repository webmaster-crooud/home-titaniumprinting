import { IconPhotoOff } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type propsServicesCard = {
    link: string;
    image?: string;
    title: string;
    price: number | string;
};

export const ServicesCard: React.FC<propsServicesCard> = ({ link, image, title, price }) => {
    return (
        <Link
            href={link}
            className="w-full rounded-md overflow-hidden border border-light-gray shadow transition-all ease-in-out duration-300 hover:shadow-lg hover:scale-105"
        >
            {image ? (
                <Image
                    src={image}
                    width={500}
                    height={500}
                    style={{ maxHeight: '209px', height: '209px', width: '100%', objectFit: 'cover' }}
                    priority
                    alt="Logo"
                />
            ) : (
                <>
                    <div className="w-full flex items-center justify-center max-h-[209px] h-[209px] bg-light-primary">
                        <div className="flex flex-col justify-center items-center">
                            <IconPhotoOff size={50} stroke={2} className="text-dark-primary" />
                            <p className="text-dark-primary font-medium text-sm">No Images</p>
                        </div>
                    </div>
                </>
            )}
            <div className="h-24 max-h-full w-full bg-white p-4">
                <h4 className="font-medium text-base mb-3">{title}</h4>
                <p className="text-gray text-sm font-light">Start from {price}</p>
            </div>
        </Link>
    );
};
