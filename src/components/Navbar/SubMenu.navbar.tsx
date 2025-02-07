import React, { useCallback, useEffect, useState } from 'react';
import { BACKEND, inter, PUBLIC } from '../../../libs/utils';
import { DefaultButton } from '../Button';
import { Categories } from '../../../libs/type';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { DefaultCard } from '../Card';
import Image from 'next/image';
import Link from 'next/link';

export const SubMenuNavbar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Categories[]>([]);
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

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BACKEND}/categories`);
                const { data } = await response.json();
                setCategories(
                    data.map((data: Categories) => ({
                        name: data.name,
                        flag: data.flag,
                        slug: data.slug,
                        description: data.description,
                        products: data.category_product.map(({ products }: { products: any }) => ({
                            name: products.name,
                            slug: products.slug,
                            flag: products.flag,
                        })),
                    })),
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <nav className={`py-5 bg-white border-b border-light-gray ${inter.className}`}>
            <div className="relative w-8/12 mx-auto xl:w-10/12">
                <Carousel>
                    <CarouselContent>
                        {categories?.map((category, index) => (
                            <CarouselItem className="basis-1/2 xl:basis-[14%]" key={category.slug}>
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
                    categories &&
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
                                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                                        <div>
                                            <Image
                                                src={'/assets/banner/subMenu.svg'}
                                                width={300}
                                                height={300}
                                                alt="Banner Header"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'cover',
                                                    objectPosition: 'right',
                                                }}
                                            />
                                        </div>

                                        <div className="grid w-full grid-cols-1 col-span-4 gap-6 xl:grid-cols-4">
                                            {category.products?.map((product, index) => (
                                                <Link href={`/produk/${product.slug}`} key={index}>
                                                    <h4 className="text-base font-medium">{product.name}</h4>
                                                    <p className="text-xs font-light text-gray">
                                                        {product.description ||
                                                            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, reiciendis.'}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </DefaultCard>
                            </div>
                        ))}
            </div>
        </nav>
    );
};
