import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
type propsDefaultButton = {
    title?: string;
    link: string;
    icon?: React.ReactElement;
    className?: string;
};

export const DefaultButton: React.FC<propsDefaultButton> = ({ title, link, icon, className }) => {
    const defaultClass =
        'bg-white rounded-md px-4 py-1.5 duration-300  ease-in-out transition-all hover:bg-light-primary hover:scale-105 flex items-center justify-center gap-2';
    return (
        <Link href={link} className={`${defaultClass} ${className}`}>
            {icon}
            {title ? <span>{title}</span> : null}
        </Link>
    );
};
