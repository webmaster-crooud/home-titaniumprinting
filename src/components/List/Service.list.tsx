import { Service } from '@/pages';
import { ServiceListButton } from '../Button/ServiceList.button';
import React, { useState } from 'react';
import { ServicesCard } from '../Card/Services.card';

type propsServiceList = {
    serviceListData: Service[];
    serviceListShow: Service;
    setServiceListShow: React.Dispatch<React.SetStateAction<Service>>;
};

export const ServiceList: React.FC<propsServiceList> = ({ serviceListData, serviceListShow, setServiceListShow }) => {
    return (
        <ul>
            {serviceListData.map((service, index) => (
                <li key={service.slug}>
                    <ServiceListButton
                        title={`${service.title}`}
                        slug={`${service.slug}`}
                        serviceListShow={serviceListShow}
                        setServiceListShow={setServiceListShow}
                    />
                </li>
            ))}
        </ul>
    );
};

export const ContentServiceList: React.FC<propsServiceList> = ({ serviceListData, serviceListShow, setServiceListShow }) => {
    return serviceListData.map(
        (service, index) =>
            serviceListShow.slug === service.slug && (
                <>
                    <h3 className="font-medium text-2xl mb-3">{service.title}</h3>
                    <p className="text-sm text-gray leading-5 font-light">{service.description}</p>

                    <div className="grid grid-cols-4 gap-6 my-8">
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                        <ServicesCard image="/assets/products/image.png" link="/" title="Kalender Poster" price={`Rp 12.000`} />
                    </div>

                    <div className="p-6 bg-gradient-to-r from-white via-[#F4F7FF] to-[#D9DDFF] rounded-md shadow-md border border-light-gray">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-lg">Kebutuhan anda tidak tersedia?</h3>
                                <p className="font-light text-sm text-gray">Silahkan hubungi kami untuk custom produk</p>
                            </div>

                            <button className="py-3 px-5 bg-white rounded-md shadow-md">
                                <span className="text-base font-semibold">Hubungi Kami</span>
                            </button>
                        </div>
                    </div>
                </>
            ),
    );
};
