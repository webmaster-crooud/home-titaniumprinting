import { CategoriesServiceCard } from '@/components/Card/CategoriesService.card';
import { ReviewSection } from '@/components/Section/Review.section';
import { IconChevronRight, IconMoodSmile, IconThumbUp } from '@tabler/icons-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <>
            <Head>
                <title>Titanium Printing | Tentang Kami</title>
            </Head>
            <header className="bg-dark min-h-[180px] w-full flex items-center justify-center">
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="uppercase text-gray">Home</span>
                        <IconChevronRight className="text-gray" stroke={4} size={14} />
                        <span className="text-blue">Tentang Kami</span>
                    </div>
                    <h1 className="text-[32px] text-white text-center">Tentang Kami</h1>
                </div>
            </header>

            <section className="grid grid-cols-2 gap-6 px-40 py-16 bg-white">
                <div className="flex flex-col gap-y-5">
                    <h2 className="font-medium text-dark text-[28px]">Layanan Printing Terbaik untuk Bisnis Anda</h2>
                    <p className="text-sm text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </p>
                    <div className="flex items-center justify-start gap-x-5">
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconMoodSmile stroke={2} size={16} /> <span>Customizeable</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray leading-[180%]">
                    We are currently the world-leading supplier in optical mouse sensor chips for conventional PC and
                    high-end gaming applications, and is an industry leader for Smart Sensor SoC solutions incorporating
                    CMOS Imager, optics and proprietary algorithm engines. With the comprehensive competencies in CIS
                    design and development, PixArt is working to continuously expanding our application portfolios
                    including Optical Navigation, Object Motion Sensing, Touch, CMOS Image Sensor, Health Management and
                    Custom ASICs.
                </p>
            </section>

            <section className="grid grid-cols-4 gap-6 px-40 py-16 bg-white">
                <CategoriesServiceCard
                    key={1}
                    title={'Layanan Printing Terbaik untuk Bisnis Anda'}
                    slug={`/kategori/testing`}
                    description={'Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu'}
                />
                <CategoriesServiceCard
                    key={1}
                    title={'Layanan Printing Terbaik untuk Bisnis Anda'}
                    slug={`/kategori/testing`}
                    description={'Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu'}
                />
                <CategoriesServiceCard
                    key={1}
                    title={'Layanan Printing Terbaik untuk Bisnis Anda'}
                    slug={`/kategori/testing`}
                    description={'Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu'}
                />
                <CategoriesServiceCard
                    key={1}
                    title={'Layanan Printing Terbaik untuk Bisnis Anda'}
                    slug={`/kategori/testing`}
                    description={'Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu'}
                />
            </section>

            <section className="flex items-center justify-center gap-6 px-40 py-16">
                <Image
                    src={'/assets/about.svg'}
                    width={200}
                    height={200}
                    style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                    alt="text"
                />
                <div className="flex flex-col px-12 py-10 gap-y-5">
                    <h2 className="font-medium text-dark text-[28px]">Layanan Printing Terbaik untuk Bisnis Anda</h2>
                    <p className="text-sm text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </p>
                    <div className="flex items-center justify-start gap-x-5">
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconMoodSmile stroke={2} size={16} /> <span>Customizeable</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center gap-6 px-40 py-16 bg-white">
                <div className="flex flex-col px-12 py-10 gap-y-5">
                    <h2 className="font-medium text-dark text-[28px]">Layanan Printing Terbaik untuk Bisnis Anda</h2>
                    <p className="text-sm text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </p>
                    <div className="flex items-center justify-start gap-x-5">
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconMoodSmile stroke={2} size={16} /> <span>Customizeable</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                    </div>
                </div>
                <Image
                    src={'/assets/about.svg'}
                    width={200}
                    height={200}
                    style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                    alt="text"
                />
            </section>

            <section className="flex items-center justify-center gap-6 px-40 py-16">
                <Image
                    src={'/assets/about.svg'}
                    width={200}
                    height={200}
                    style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                    alt="text"
                />
                <div className="flex flex-col px-12 py-10 gap-y-5">
                    <h2 className="font-medium text-dark text-[28px]">Layanan Printing Terbaik untuk Bisnis Anda</h2>
                    <p className="text-sm text-gray">
                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan
                        materi pemasaran yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing
                        yang andal dan tepat waktu!
                    </p>
                    <div className="flex items-center justify-start gap-x-5">
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconMoodSmile stroke={2} size={16} /> <span>Customizeable</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <IconThumbUp stroke={2} size={16} /> <span>Garansi</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-40 py-16 bg-white">
                <div className="grid grid-cols-4 gap-6">
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={'/assets/about.svg'}
                            width={200}
                            height={200}
                            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                            alt="text"
                        />
                        <div className="flex flex-col gap-4 p-4 bg-light-primary">
                            <h3 className="text-lg font-medium text-dark">
                                Layanan Printing Terbaik untuk Bisnis Anda
                            </h3>
                            <p className="text-sm text-gray tracking-[1%]">
                                Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={'/assets/about.svg'}
                            width={200}
                            height={200}
                            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                            alt="text"
                        />
                        <div className="flex flex-col gap-4 p-4 bg-light-primary">
                            <h3 className="text-lg font-medium text-dark">
                                Layanan Printing Terbaik untuk Bisnis Anda
                            </h3>
                            <p className="text-sm text-gray tracking-[1%]">
                                Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={'/assets/about.svg'}
                            width={200}
                            height={200}
                            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                            alt="text"
                        />
                        <div className="flex flex-col gap-4 p-4 bg-light-primary">
                            <h3 className="text-lg font-medium text-dark">
                                Layanan Printing Terbaik untuk Bisnis Anda
                            </h3>
                            <p className="text-sm text-gray tracking-[1%]">
                                Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={'/assets/about.svg'}
                            width={200}
                            height={200}
                            style={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                            alt="text"
                        />
                        <div className="flex flex-col gap-4 p-4 bg-light-primary">
                            <h3 className="text-lg font-medium text-dark">
                                Layanan Printing Terbaik untuk Bisnis Anda
                            </h3>
                            <p className="text-sm text-gray tracking-[1%]">
                                Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full my-12 border rounded-md border-dark-primary h-[322px]"></div>

                <div className="flex items-center justify-between w-full p-6 rounded-md bg-dark-primary">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium text-white">
                            Print Laser Jet Terbaik Hanya di Titanium Print
                        </h3>
                        <p className="text-sm text-light-gray">
                            Kami memiliki layanan printing dengan teknologi terbaru memastikan hasilnya berkualitas
                            sesuai dengan kebutuhan anda
                        </p>
                    </div>
                    <div className="relative flex items-center justify-end w-4/12">
                        <div className="flex items-center justify-center group">
                            <div className="w-[457px] h-[457px] rounded-full border-[#F5EEFF]/20 border absolute group-hover:w-0 group-hover:h-0 group-hover:opacity-0 duration-300 transition-all ease-out"></div>
                            <div className="w-[347px] h-[347px] rounded-full border-[#F5EEFF]/20 border absolute group-hover:w-0 group-hover:h-0 group-hover:opacity-0 duration-300 transition-all ease-out"></div>
                            <div className="relative flex items-center justify-center">
                                <Link
                                    href={'/'}
                                    className="px-6 py-3 transition-all duration-300 ease-out bg-white border rounded-md shadow-md border-light-gray group-hover:scale-95"
                                >
                                    <span className="text-lg font-semibold">Lihat Layanan</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Review */}
            <ReviewSection />
        </>
    );
}
