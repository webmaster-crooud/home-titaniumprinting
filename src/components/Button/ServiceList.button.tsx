import { Service } from '@/pages';
import { IconCaretRightFilled } from '@tabler/icons-react';
import React from 'react';

type propsServiceListButton = {
    title: string;
    slug: string;
    serviceListShow: Service;
    setServiceListShow: React.Dispatch<React.SetStateAction<Service>>;
};

export const ServiceListButton: React.FC<propsServiceListButton> = ({ title, slug, serviceListShow, setServiceListShow }) => {
    return (
        <button
            onClick={() => setServiceListShow({ title: title, slug: slug })}
            className={`py-6 px-7 w-full border-b border-light-gray ${
                serviceListShow.slug === slug ? 'bg-light-primary' : 'bg-white-primary'
            } hover:bg-light-primary transition-colors ease-in-out duration-300 group`}
        >
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">{title}</h4>
                <IconCaretRightFilled
                    size={16}
                    className={`text-gray transition-transform ease-in-out duration-300 ${
                        serviceListShow.slug === slug ? 'rotate-90' : 'rotate-0 group-hover:rotate-90'
                    }`}
                />
            </div>
        </button>
    );
};
