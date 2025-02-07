import { ServiceListButton } from '../Button/ServiceList.button';
import React, { useState } from 'react';
import { ServicesCard } from '../Card/Services.card';
import { PUBLIC } from '../../../libs/utils';

type propsServiceList = {
    serviceListData: Service[] | undefined;
    serviceListShow: { slug: number | string };
    setServiceListShow?: React.Dispatch<React.SetStateAction<{ slug: number | string }>>;
};

export interface Service {
    name: string;
    flag?: string;
    slug: string;
    products?: {
        name: string;
        slug: string;
        description: string;
        cover: string;
    }[];
}

export const ServiceList: React.FC<propsServiceList> = ({ serviceListData, serviceListShow, setServiceListShow }) => {
    return (
        <ul>
            {serviceListData &&
                serviceListData.map((service, index) => (
                    <li key={index}>
                        <ServiceListButton
                            name={`${service.name}`}
                            slug={`${service.slug}`}
                            serviceListShow={serviceListShow}
                            setServiceListShow={setServiceListShow}
                        />
                    </li>
                ))}
        </ul>
    );
};

export const ContentServiceList: React.FC<propsServiceList> = ({ serviceListData, serviceListShow }) => {
    return (
        serviceListData &&
        serviceListData.map(
            (service, index) =>
                serviceListShow.slug === service.slug && (
                    <React.Fragment key={index}>
                        <h3 className="mb-3 text-2xl font-medium">{service.name}</h3>
                        <p className="text-sm font-light leading-5 text-gray">
                            {service.products?.length === 0
                                ? 'Data masih kosong!'
                                : service.products && service.products[0].description}
                        </p>

                        <div className="grid grid-cols-1 gap-6 my-8 xl:grid-cols-4">
                            {service.products &&
                                (service.products.length > 0 ? (
                                    service.products.map((product, index) => (
                                        <ServicesCard
                                            image={
                                                product.cover
                                                    ? `${PUBLIC}/cover/${product.cover}`
                                                    : '/assets/products/404.png'
                                            }
                                            link={`/produk/${product.slug}`}
                                            title={product.name}
                                            description={product.description}
                                            key={index}
                                        />
                                    ))
                                ) : (
                                    <ServicesCard
                                        image="/assets/products/404.png"
                                        link="/"
                                        title="Data Masih Kosong!"
                                        description={`Data Masih Kosong!`}
                                    />
                                ))}
                        </div>

                        <div className="p-6 bg-gradient-to-r from-white via-[#F4F7FF] to-[#D9DDFF] rounded-md shadow-md border border-light-gray">
                            <div className="flex flex-col items-center justify-between gap-3 xl:flex-row">
                                <div>
                                    <h3 className="text-lg font-medium">Kebutuhan anda tidak tersedia?</h3>
                                    <p className="text-sm font-light text-gray">
                                        Silahkan hubungi kami untuk custom produk
                                    </p>
                                </div>

                                <button className="px-5 py-3 bg-white rounded-md shadow-md">
                                    <span className="text-base font-semibold">Hubungi Kami</span>
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                ),
        )
    );
};
