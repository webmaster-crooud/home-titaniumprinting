import React from 'react';

type DefaultCard = {
    children: React.ReactNode;
    padding?: boolean;
    border?: boolean;
};

export const DefaultCard: React.FC<DefaultCard> = ({ children, padding, border }) => {
    return (
        <div
            className={`relative overflow-hidden bg-white rounded-md shadow ${padding ? 'py-10 px-6' : 'p-0'} ${
                border ? ' border border-light-gray' : 'border-none'
            }`}
        >
            {children}
        </div>
    );
};
