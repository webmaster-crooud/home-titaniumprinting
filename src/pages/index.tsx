import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { BACKEND } from '../../libs/utils';
import { Categories, Data } from '../../libs/type';
import { Header } from '@/components/Header';
import { CategoriesServiceCard } from '@/components/Card/CategoriesService.card';
import { ServicesSectionCard } from '@/components/Card/Section/ServicesSection.card';
import { ServicesCard } from '@/components/Card/Services.card';
import { ContentServiceList, ServiceList } from '@/components/List/Service.list';
import { useState } from 'react';
import { WhyUsSection } from '@/components/Section/WhyUs.section';
import { ReviewSection } from '@/components/Section/Review.section';

export interface Service {
    title: string;
    slug: string;
    description?: string;
}

const services: Service[] = [
    {
        title: 'Media Promosi',
        slug: 'media-promosi',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas officiis impedit accusantium ratione eligendi eum eius quisquam veritatis. Deserunt a quia ipsa consectetur autem rem rerum saepe excepturi ex quis!',
    },
    {
        title: 'Baner dan Spanduk',
        slug: 'baner-dan-spanduk',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas officiis impedit accusantium ratione eligendi eum eius quisquam veritatis. Deserunt a quia ipsa consectetur autem rem rerum saepe excepturi ex quis!',
    },
];
export default function Home({ data }: { data: Data }) {
    const [serviceListShow, setServiceListShow] = useState<Service>(services[0]);
    return (
        <>
            <SubMenuNavbar categories={data.categories} />
            <Header />

            {/* The best Categories Services */}
            <section className="w-10/12 py-16 mx-auto">
                {/* TItle */}
                <div className="mb-8 text-center">
                    <h2 className="text-[28px] font-medium">Kategori Paling Laris</h2>
                    <h5 className="w-8/12 mx-auto mt-3 text-sm font-light text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </h5>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    <CategoriesServiceCard
                        title="Media Promosi"
                        slug="media-promosi"
                        description="Membantu meningkatkan promosi dari produk maupun perusahaan anda!"
                    />
                </div>
            </section>

            {/* Service's */}
            <section className="grid grid-rows-2 py-16 bg-white gap-y-8">
                {/* The Best Services */}
                <ServicesSectionCard
                    bgColor="bg-gradient-to-r from-[#FAFBFF] via-[#F1F5FF] to-[#F1F5FF]"
                    title="Layanan terlaris untuk kebutuhan Promosi"
                    link="/"
                    description="Sangat cocok untuk membantu meningkatkan promosi dari produk maupun perusahaan anda!"
                >
                    <ServicesCard
                        image="/assets/products/image.png"
                        link="/produk/buku"
                        title="Cetak Buku"
                        price={`Rp 12.000`}
                    />
                </ServicesSectionCard>
                <ServicesSectionCard
                    bgColor="bg-gradient-to-r from-[#E4F8F5] via-[#DAF3F0] to-[#DAF3F0]"
                    title="Layanan terlaris untuk kebutuhan Souvenir"
                    link="/"
                    description="Sangat cocok untuk membantu meningkatkan promosi dari produk maupun perusahaan anda!"
                >
                    <ServicesCard
                        image="/assets/products/image.png"
                        link="/"
                        title="Kalender Poster"
                        price={`Rp 12.000`}
                    />
                    <ServicesCard link="/produk/buku" title="Kalender Poster" price={`Rp 12.000`} />
                </ServicesSectionCard>
            </section>

            {/* Exploration Service */}
            <section className="py-16 bg-white">
                <div className="w-10/12 mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[28px] font-medium mb-3">Eksplor Semua Layanan Printing Kami</h2>
                        <p className="w-8/12 text-sm font-light leading-6 text-gray">
                            Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                            materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan
                            printing yang andal dan tepat waktu!
                        </p>
                    </div>

                    <div className="grid min-h-screen grid-cols-4 overflow-hidden border rounded-md border-light-gray">
                        <div className="border-r bg-white-primary border-light-gray">
                            <div>
                                <ServiceList
                                    serviceListData={services}
                                    serviceListShow={serviceListShow}
                                    setServiceListShow={setServiceListShow}
                                />
                            </div>
                        </div>
                        <div className="col-span-3 px-6 py-5">
                            <ContentServiceList
                                serviceListData={services}
                                serviceListShow={serviceListShow}
                                setServiceListShow={setServiceListShow}
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
    const response = await fetch(`${BACKEND}/categories`);
    const result = await response.json();
    const categories: Categories[] = result.data;

    const data: Data = {
        categories,
    };

    return {
        props: {
            data,
        },
        revalidate: 1 * 60 * 60,
    };
}
