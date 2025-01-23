import { IconCaretRightFilled } from '@tabler/icons-react';
import React from 'react';
import { Service } from '../List/Service.list';

type propsServiceListButton = {
    name: string;
    slug: string;
    serviceListShow?: { slug: number | string };
    setServiceListShow?: React.Dispatch<React.SetStateAction<{ slug: number | string }>>;
};

export const ServiceListButton: React.FC<propsServiceListButton> = ({
    name,
    slug,
    serviceListShow,
    setServiceListShow,
}) => {
    return (
        <button
            onClick={() => setServiceListShow && setServiceListShow({ slug: slug })}
            className={`py-6 px-7 w-full border-b border-light-gray ${
                serviceListShow && serviceListShow.slug === slug ? 'bg-light-primary' : 'bg-white-primary'
            } hover:bg-light-primary transition-colors ease-in-out duration-300 group`}
        >
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">{name}</h4>
                <IconCaretRightFilled
                    size={16}
                    className={`text-gray transition-transform ease-in-out duration-300 ${
                        serviceListShow && serviceListShow.slug === slug
                            ? 'rotate-90'
                            : 'rotate-0 group-hover:rotate-90'
                    }`}
                />
            </div>
        </button>
    );
};
