import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
type propsDefaultButton = {
    title: string | React.ReactNode;
    link?: string;
    icon?: React.ReactElement;
    className?: string;
    onClick?: React.ReactEventHandler;
    onMouseEnter?: React.ReactEventHandler;
    onMouseLeave?: React.ReactEventHandler;
};

export const DefaultButton: React.FC<propsDefaultButton> = ({
    title,
    link,
    icon,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const defaultClass =
        'bg-white rounded-md px-4 py-1.5 duration-300  ease-in-out  transition-all hover:underline hover:decoration-wavy hover:scale-105 flex items-center justify-center gap-2 underline-offset-4 decoration-dark-primary';
    return onMouseEnter || onClick || onMouseLeave ? (
        <button
            onClick={onClick}
            className={`${defaultClass} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
            {title ? <span>{title}</span> : null}
        </button>
    ) : (
        <Link href={link ? link : ''} className={`${defaultClass} ${className}`}>
            {icon}
            {title ? <span>{title}</span> : null}
        </Link>
    );
};
