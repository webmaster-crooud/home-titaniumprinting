import React, { useCallback, useState } from 'react';
import { inter } from '../../../libs/utils';
import { DefaultButton } from '../Button';
import { Categories } from '../../../libs/type';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { DefaultCard } from '../Card';
import Image from 'next/image';

type propsSubMenuNavbar = {
    categories: Categories[];
};

export const SubMenuNavbar: React.FC<propsSubMenuNavbar> = ({ categories }) => {
    const [popUpMenu, setPopUpMenu] = useState<{ slug: string } | undefined>(undefined);

    const handlerMouseEnter = useCallback((slug: string) => {
        setPopUpMenu({ slug });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setPopUpMenu(undefined);
    }, []);

    // Perbaiki: hanya simpan slug kategori yang sesuai
    const handlePopUpMouseLeave = useCallback(() => {
        setPopUpMenu(undefined);
    }, []);

    return (
        <nav className={`py-5 bg-white border-b border-light-gray ${inter.className}`}>
            <div className="relative w-10/12 mx-auto">
                <Carousel>
                    <CarouselContent>
                        {categories.map((category, index) => (
                            <CarouselItem className="basis-2/12" key={category.slug}>
                                <DefaultButton
                                    title={`${category.name}`}
                                    className="w-full text-sm text-nowrap"
                                    onMouseEnter={() => handlerMouseEnter(category.slug)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-dark border-dark" />
                    <CarouselNext className="text-dark border-dark" />
                </Carousel>

                {/* Menampilkan Pop-Up jika popUpMenu ada */}
                {popUpMenu &&
                    categories
                        .filter((category) => category.slug === popUpMenu.slug) // hanya menampilkan menu sesuai dengan slug
                        .map((category) => (
                            <div
                                key={category.slug}
                                className="absolute z-[2] top-8 left-0 w-full" // posisikan di bawah carousel
                                onMouseEnter={() => setPopUpMenu({ slug: category.slug })} // Menjaga menu tetap muncul saat mouse di dalam
                                onMouseLeave={handlePopUpMouseLeave}
                            >
                                <DefaultCard padding border>
                                    <div className="grid grid-cols-4 gap-6">
                                        <div>
                                            <Image
                                                src={'/assets/banner/subMenu.svg'}
                                                width={300}
                                                height={300}
                                                alt="Banner Header"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 col-span-3 gap-6">
                                            <div>
                                                <h4 className="text-base font-medium">Shelf Taker</h4>
                                                <p className="text-xs font-light text-gray">Membantu meningkatkan promosi dari produk maupun.</p>
                                            </div>
                                            {/* Ulangi bagian konten sesuai kebutuhan */}
                                        </div>
                                    </div>
                                </DefaultCard>
                            </div>
                        ))}
            </div>
        </nav>
    );
};
