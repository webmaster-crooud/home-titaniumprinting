import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { ReviewCard } from '../Card/Review.card';
import Autoplay from 'embla-carousel-autoplay';

export const ReviewSection = () => {
    return (
        <div className="relative py-16 bg-white flex items-center justify-center">
            <div className="h-[498px] w-10/12 mx-auto bg-white-primary rounded-md">
                <div className="flex justify-center w-full h-full">
                    <div>
                        <div className="relative top-14">
                            <h3 className="text-center text-lg text-gray">Trusted by 4000+ Companies</h3>
                            <div className="flex items-center justify-between mt-8 mb-12 gap-8">
                                <Image
                                    src={'/assets/customers/cust.svg'}
                                    alt="customers"
                                    width={300}
                                    height={300}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                                <Image
                                    src={'/assets/customers/cust1.svg'}
                                    alt="customers"
                                    width={300}
                                    height={300}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                                <Image
                                    src={'/assets/customers/cust2.svg'}
                                    alt="customers"
                                    width={300}
                                    height={300}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                                <Image
                                    src={'/assets/customers/cust3.svg'}
                                    alt="customers"
                                    width={300}
                                    height={300}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                                <Image
                                    src={'/assets/customers/cust4.svg'}
                                    alt="customers"
                                    width={300}
                                    height={300}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority
                                />
                            </div>
                        </div>

                        <div className="absolute right-0 left-0 bottom-24">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 5000,
                                    }),
                                ]}
                            >
                                <CarouselContent className="pb-5">
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                    <CarouselItem className="basis-4/12">
                                        <ReviewCard />
                                    </CarouselItem>
                                </CarouselContent>
                                {/* <CarouselPrevious className="text-dark border-dark" />
                                <CarouselNext className="text-dark border-dark" /> */}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
