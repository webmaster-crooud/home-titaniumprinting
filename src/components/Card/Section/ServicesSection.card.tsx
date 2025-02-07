import Link from 'next/link';
import React from 'react';

type propsServiceSectionCard = {
    bgColor: string;
    children: React.ReactNode;
    title: string;
    description: string;
    link: string;
};

export const ServicesSectionCard: React.FC<propsServiceSectionCard> = ({
    title,
    description,
    link,
    bgColor = 'bg-primary',
    children,
}) => {
    const defaultClassName = `w-11/12 xl:w-10/12 rounded-md py-6 px-5 border border-light-gray mx-auto ${bgColor}`;
    return (
        <div className={defaultClassName}>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
                <div className="relative">
                    <h2 className="font-medium text-[28px] leading-8 mb-3">{title}</h2>
                    <h5 className="font-light leading-7 text-gray">{description}</h5>
                    <Link
                        href={link}
                        className="relative bottom-0 flex items-center justify-center px-5 py-3 mt-5 bg-white border rounded-md shadow xl:mt-0 xl:absolute w-52 border-light-gray"
                    >
                        <span className="text-base font-semibold">Lihat Layanan</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 xl:col-span-3">
                    {/* Card Content Services */}
                    {children}
                </div>
            </div>
        </div>
    );
};
