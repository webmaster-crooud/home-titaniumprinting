import { IconPhotoOff } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type propsServicesCard = {
    link: string;
    image?: string;
    title: string;
    description: number | string | null;
};

export const ServicesCard: React.FC<propsServicesCard> = ({ link, image, title, description }) => {
    return (
        <Link
            href={link}
            className="w-full overflow-hidden transition-all duration-300 ease-in-out border rounded-md shadow border-light-gray hover:shadow-lg hover:scale-105"
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
                        <div className="flex flex-col items-center justify-center">
                            <IconPhotoOff size={50} stroke={2} className="text-dark-primary" />
                            <p className="text-sm font-medium text-dark-primary">No Images</p>
                        </div>
                    </div>
                </>
            )}
            <div className="w-full h-full p-4 bg-white min-h-24">
                <h4 className="mb-3 text-base font-medium">{title}</h4>
                <p className="text-sm font-light text-gray">{description}</p>
            </div>
        </Link>
    );
};
