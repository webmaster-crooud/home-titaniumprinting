import Link from 'next/link';
import React from 'react';

type propsServiceSectionCard = {
    bgColor: string;
    children: React.ReactNode;
    title: string;
    description: string;
    link: string;
};

export const ServicesSectionCard: React.FC<propsServiceSectionCard> = ({ title, description, link, bgColor = 'bg-primary', children }) => {
    const defaultClassName = `w-10/12 rounded-md py-6 px-5 border border-light-gray mx-auto ${bgColor}`;
    return (
        <div className={defaultClassName}>
            <div className="grid grid-cols-4 gap-5">
                <div className="relative">
                    <h2 className="font-medium text-[28px] leading-8 mb-3">{title}</h2>
                    <h5 className="text-gray font-light leading-7">{description}</h5>
                    <Link
                        href={link}
                        className="bg-white px-5 py-3 rounded-md shadow flex items-center justify-center w-52 absolute bottom-0 border border-light-gray"
                    >
                        <span className="font-semibold text-base">Lihat Layanan</span>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-6 col-span-3">
                    {/* Card Content Services */}
                    {children}
                </div>
            </div>
        </div>
    );
};
