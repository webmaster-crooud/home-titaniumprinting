import React from 'react';
import { inter } from '../../../libs/utils';
import { DefaultButton } from '../Button';
import { Categories } from '../../../libs/type';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

type propsSubMenuNavbar = {
    categories: Categories[];
};
export const SubMenuNavbar: React.FC<propsSubMenuNavbar> = ({ categories }) => {
    return (
        <nav className={`py-5 bg-white border-b border-light-gray ${inter.className}`}>
            <div className="w-10/12 mx-auto ">
                <Carousel>
                    <CarouselContent>
                        {categories.map((category, index) => (
                            <CarouselItem className="basis-3/12" key={index}>
                                <DefaultButton
                                    title={`${category.name}`}
                                    link={`/kategori/${category.slug}`}
                                    className="w-full text-nowrap"
                                    key={index}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-dark border-dark" />
                    <CarouselNext className="text-dark border-dark" />
                </Carousel>
            </div>
        </nav>
    );
};
