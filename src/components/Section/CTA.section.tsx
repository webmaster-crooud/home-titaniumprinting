import Link from 'next/link';
import { TypewriterEffect } from '../ui/typewriter-effect';

const words = [
    {
        text: 'Pemesanan',
    },
    {
        text: 'dengan',
    },
    {
        text: 'jumlah',
    },
    {
        text: 'dan',
    },
    {
        text: 'spesifikasi',
    },
    {
        text: 'khusus?',
    },
];
export const CTASection = () => {
    return (
        <>
            <section className="relative bg-dark-primary py-16 min-h-[236px] overflow-hidden">
                <div className="flex flex-col items-start justify-start w-10/12 gap-8 mx-auto xl:justify-center xl:items-center xl:flex-row">
                    <div className="w-full xl:w-8/12">
                        <h2 className="">
                            <TypewriterEffect
                                className="text-white !text-3xl !tracking-[0.5%] !mb-3 !font-normal text-start"
                                words={words}
                            />
                        </h2>
                        <p className="w-8/12 font-light leading-7 text-light-gray">
                            Kami memiliki customer service professional yang siap membantu anda dalam pemesanan yang
                            membutuhkan jumlah atau spesifikasi khusus
                        </p>
                    </div>

                    <div className="relative flex items-center justify-end w-10/12 xl:w-4/12">
                        <div className="flex items-center justify-center group">
                            <div className="w-[457px] h-[457px] rounded-full border-[#F5EEFF]/20 border absolute group-hover:w-0 group-hover:h-0 group-hover:opacity-0 duration-300 transition-all ease-out"></div>
                            <div className="w-[347px] h-[347px] rounded-full border-[#F5EEFF]/20 border absolute group-hover:w-0 group-hover:h-0 group-hover:opacity-0 duration-300 transition-all ease-out"></div>
                            <div className="relative flex items-center justify-center">
                                <Link
                                    href={'/'}
                                    className="px-6 py-3 transition-all duration-300 ease-out bg-white border rounded-md shadow-md border-light-gray group-hover:scale-95"
                                >
                                    <span className="text-lg font-semibold">Hubungi Kami</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
