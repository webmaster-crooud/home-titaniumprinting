import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

export const Header = () => {
    return (
        <header className="w-full py-8 bg-white">
            <div className="w-9/12 px-1 mx-auto xl:px-0 xl:w-10/12">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <Image
                                src={'assets/banner/header.svg'}
                                alt=""
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src={'assets/banner/header.svg'}
                                alt=""
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src={'assets/banner/header.svg'}
                                alt=""
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="text-dark border-dark" />
                    <CarouselNext className="text-dark border-dark" />
                </Carousel>
            </div>
        </header>
    );
};
