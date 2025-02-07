import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { BACKEND, PANEL, PUBLIC } from '../../libs/utils';
import { Categories, Data, Services } from '../../libs/type';
import { Header } from '@/components/Header';
import { CategoriesServiceCard } from '@/components/Card/CategoriesService.card';
import { ServicesSectionCard } from '@/components/Card/Section/ServicesSection.card';
import { ServicesCard } from '@/components/Card/Services.card';
import { ContentServiceList, ServiceList } from '@/components/List/Service.list';
import { WhyUsSection } from '@/components/Section/WhyUs.section';
import { ReviewSection } from '@/components/Section/Review.section';
import React, { useState } from 'react';
import Link from 'next/link';
export default function Home({ data }: { data: Data }) {
    const slugSelected = data.services && data.services[0].slug;
    const [serviceListShow, setServiceListShow] = useState<{ slug: number | string }>({ slug: slugSelected || '' });
    return (
        <>
            <SubMenuNavbar />
            <Header />

            {/* The best Categories Services */}
            <section className="w-11/12 py-16 mx-auto xl:w-10/12">
                {/* TItle */}
                <div className="mb-8 text-center">
                    <h2 className="text-[28px] font-medium">Kategori Paling Laris</h2>
                    <h5 className="w-11/12 mx-auto mt-3 text-sm font-light xl:w-8/12 text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </h5>
                </div>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
                    {data.favCategories?.map((fav, idx) => (
                        <CategoriesServiceCard
                            key={idx}
                            title={fav.name}
                            slug={`/kategori/${fav.slug}`}
                            description={
                                fav.description ||
                                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum deleniti dicta quos.'
                            }
                        />
                    ))}
                </div>
            </section>

            {/* Service's */}
            <section className="grid grid-rows-1 py-16 bg-white xl:grid-rows-2 gap-y-8">
                {/* The Best Services */}
                <ServicesSectionCard
                    bgColor="bg-gradient-to-r from-[#FAFBFF] via-[#F1F5FF] to-[#F1F5FF]"
                    title={`Layanan terlaris untuk kebutuhan ${data.services && data.services[0].name}`}
                    link={`/layanan/${data.services && data.services[0].slug}`}
                    description="Sangat cocok untuk membantu meningkatkan promosi dari produk maupun perusahaan anda!"
                >
                    {data.services &&
                        data.services[0].products?.map((product, index) => (
                            <ServicesCard
                                image={product.cover && `${PUBLIC}/cover/${product.cover}`}
                                link={'/produk/' + product.slug}
                                title={product.name}
                                description={product.description}
                                key={index}
                            />
                        ))}
                </ServicesSectionCard>
                <ServicesSectionCard
                    bgColor="bg-gradient-to-r from-[#E4F8F5] via-[#DAF3F0] to-[#DAF3F0]"
                    title={`Layanan terlaris untuk kebutuhan ${data.services && data.services[1].name}`}
                    link={`/layanan/${data.services && data.services[1].slug}`}
                    description="Sangat cocok untuk membantu meningkatkan promosi dari produk maupun perusahaan anda!"
                >
                    {data.services && data.services[1].products?.length === 0 ? (
                        <ServicesCard link="/404" title="Data tidak ditemukan" description={`Data masih kosong!`} />
                    ) : (
                        data.services &&
                        data.services[1].products?.map((product, index) => (
                            <ServicesCard
                                image={product.cover && `${PUBLIC}/cover/${product.cover}`}
                                link={'/produk/' + product.slug}
                                title={product.name}
                                description={product.description}
                                key={index}
                            />
                        ))
                    )}
                </ServicesSectionCard>
            </section>

            {/* Exploration Service */}
            <section className="py-16 bg-white">
                <div className="w-11/12 mx-auto xl:w-10/12">
                    <div className="mb-8">
                        <div className="flex flex-col items-start justify-between gap-5 xl:items-end xl:flex-row">
                            <div>
                                <h2 className="text-[28px] font-medium mb-3">Eksplor Semua Layanan Printing Kami</h2>
                                <p className="w-8/12 text-sm font-light leading-6 text-gray">
                                    Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda
                                    menciptakan materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda
                                    dengan layanan printing yang andal dan tepat waktu!
                                </p>
                            </div>
                            <Link
                                href={'/produk'}
                                className="px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out rounded-lg bg-dark-primary text-nowrap hover:scale-95"
                            >
                                Lihat Semua Layanan
                            </Link>
                        </div>
                    </div>

                    <div className="grid min-h-screen grid-cols-1 overflow-hidden border rounded-md xl:grid-cols-4 border-light-gray">
                        <div className="border-r bg-white-primary border-light-gray">
                            <div>
                                <ServiceList
                                    serviceListData={data.services}
                                    serviceListShow={serviceListShow}
                                    setServiceListShow={setServiceListShow}
                                />
                            </div>
                        </div>
                        <div className="col-span-3 px-6 py-5">
                            <ContentServiceList
                                serviceListData={data && data.services}
                                serviceListShow={serviceListShow}
                                // serviceListShow={serviceListShow}
                                // setServiceListShow={setServiceListShow}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why us? */}
            <WhyUsSection />

            {/* Review */}
            <ReviewSection />
        </>
    );
}

export async function getStaticProps() {
    const response = await fetch(`${BACKEND}/home`);
    const result = await response.json();
    const categories: Categories[] = result.data.categories.map((data: Categories) => ({
        name: data.name,
        flag: data.flag,
        slug: data.slug,
        description: data.description,
        products: data.category_product.map(({ products }: { products: any }) => ({
            name: products.name,
            slug: products.slug,
            flag: products.flag,
            cover: products.cover,
        })),
    }));
    const favCategories: Categories[] = result.data.favCategories;
    const services: Services[] = result.data.services.map((data: Services) => ({
        name: data.name,
        flag: data.flag,
        slug: data.slug,
        products: data.service_product.map(({ products }: { products: any }) => ({
            name: products.name,
            slug: products.slug,
            description: products.description,
            cover: products.cover,
        })),
    }));

    const data: Data = {
        categories,
        favCategories,
        services,
    };

    return {
        props: {
            data,
        },
        revalidate: 1 * 60 * 60,
    };
}
