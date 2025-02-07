import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { ReviewCard } from '../Card/Review.card';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { testimoni } from '@/data/testimoni';

interface Testimoni {
    id: string | number;
    name: string;
    value: string;
}

export const ReviewSection = () => {
    const [data, setData] = useState<Testimoni[]>([]);
    useEffect(() => {
        setData(testimoni);
    }, []);

    return (
        <div className="relative flex items-center justify-center py-16 bg-white">
            <div className="min-h-[800px] xl:min-h-[600px] w-11/12 xl:w-10/12 mx-auto bg-white-primary rounded-md">
                <div className="flex flex-col flex-wrap justify-center w-full h-full xl:flex-row">
                    <div>
                        <div className="relative top-14">
                            <h3 className="text-lg text-center text-gray">Trusted by 4000+ Companies</h3>
                            <div className="grid items-center justify-between grid-cols-2 gap-8 mt-8 mb-12 xl:grid-cols-5">
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
                        <div className="absolute bottom-0 left-0 right-0">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 5000,
                                    }),
                                ]}
                            >
                                <CarouselContent className="pb-5">
                                    {data.map((data) => (
                                        <CarouselItem className="basis-full xl:basis-4/12" key={data.id}>
                                            <ReviewCard name={data.name} value={data.value} />
                                        </CarouselItem>
                                    ))}
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
