import Image from 'next/image';
import { DefaultCard } from '../Card';
import { IconMoodSmile, IconThumbUp } from '@tabler/icons-react';

export const WhyUsSection = () => {
    return (
        <section className="py-16 w-10/12 mx-auto">
            <h2 className="text-center font-medium text-[28px] mb-8">Kenapa Harus Titanium Printing</h2>

            <div className="grid grid-cols-2 gap-6">
                <DefaultCard border>
                    <div className="grid grid-cols-3 h-full">
                        <Image
                            src={'/assets/items/images.svg'}
                            alt="OK"
                            width={300}
                            height={300}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                top: 0,
                                left: 0,
                            }}
                        />

                        <div className="col-span-2 z-[1] bg-white">
                            <div className="flex items-center justify-center w-full h-full py-10 px-6">
                                <div>
                                    <h4 className="font-medium text-xl">Layanan Printing Terbaik untuk Bisnis Anda</h4>
                                    <p className="text-sm font-light text-gray mt-3 mb-8">
                                        Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu Anda menciptakan materi pemasaran
                                        yang efektif dan menarik. Tingkatkan citra bisnis Anda dengan layanan printing yang andal dan tepat waktu!
                                    </p>

                                    <div className="flex items-center justify-start gap-[20px]">
                                        <div className="flex items-center justify-center gap-2">
                                            <IconThumbUp size={23} stroke={1.7} /> <span className="text-base font-medium">Garansi</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <IconMoodSmile size={23} stroke={1.7} /> <span className="text-base font-medium">Customizeable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DefaultCard>
                <div className="grid grid-rows-2 gap-6">
                    <DefaultCard border>
                        <div className="grid grid-cols-3 h-[188px]">
                            <Image
                                src={'/assets/items/images01.svg'}
                                alt="OK"
                                width={300}
                                height={300}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    top: 0,
                                    left: 0,
                                }}
                            />

                            <div className="col-span-2 h-[188px]">
                                <div className="flex items-center justify-center w-full h-full py-10 px-6">
                                    <div>
                                        <h4 className="font-medium text-xl">Layanan Printing Terbaik untuk Bisnis Anda</h4>
                                        <p className="text-sm font-light text-gray mt-3">
                                            Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DefaultCard>
                    <DefaultCard border>
                        <div className="grid grid-cols-3 h-[188px]">
                            <Image
                                src={'/assets/items/images02.svg'}
                                alt="OK"
                                width={300}
                                height={300}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    top: 0,
                                    left: 0,
                                }}
                            />

                            <div className="col-span-2 h-[188px]">
                                <div className="flex items-center justify-center w-full h-full py-10 px-6">
                                    <div>
                                        <h4 className="font-medium text-xl">Layanan Printing Terbaik untuk Bisnis Anda</h4>
                                        <p className="text-sm font-light text-gray mt-3">
                                            Dengan berbagai opsi kustomisasi dan teknologi terbaru, kami siap membantu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DefaultCard>
                </div>
            </div>
        </section>
    );
};
