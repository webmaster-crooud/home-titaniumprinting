import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type propsCategoriesServiceCard = {
    title: string;
    icon?: React.ReactElement;
    description: string;
    slug: string;
};

export const CategoriesServiceCard: React.FC<propsCategoriesServiceCard> = ({ title, icon, slug, description }) => {
    const defaultIcon = (
        <Image src={'/assets/icons/advertisment.png'} width={300} height={300} style={{ height: 'auto', width: 'auto' }} priority alt="icons" />
    );
    return (
        <div className="px-5 rounded-lg shadow-md w-full h-96 bg-gradient-to-tr from-white via-[#F4F7FF] to-[#D9DDFF] border border-light-gray p-5 flex items-center justify-center">
            <div>
                <div className="flex items-center justify-center">{icon ? icon : defaultIcon}</div>
                <div className="text-center">
                    <h3 className="font-medium text-[22px] my-5">{title}</h3>
                    <p className="text-base text-gray font-light">{description}</p>
                </div>

                <Link href={slug} className="mt-5 flex items-center justify-center w-full mx-auto py-3 rounded border border-light-gray shadow">
                    <div className="font-medium text-base text-dark">Lihat Layanan</div>
                </Link>
            </div>
        </div>
    );
};
