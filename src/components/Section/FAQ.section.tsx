import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

interface Faq {
    id: number;
    title?: string;
    description?: string;
}

const faqData: Faq[] = [
    {
        id: 1,
        title: 'Berapa lama waktu yang diperlukan untuk proses cetak?',
        description:
            'Waktu pemrosesan tergantung pada jenis dan jumlah pesanan. Umumnya, pesanan standar memerlukan waktu 3-5 hari kerja. Untuk kebutuhan mendesak, silakan hubungi kami untuk opsi ekspres.',
    },
    {
        id: 2,
        title: 'Apakah menerima desain dari pelanggan?',
        description:
            'Waktu pemrosesan tergantung pada jenis dan jumlah pesanan. Umumnya, pesanan standar memerlukan waktu 3-5 hari kerja. Untuk kebutuhan mendesak, silakan hubungi kami untuk opsi ekspres.',
    },
    {
        id: 3,
        title: 'Apa jenis layanan printing yang ditawarkan?',
        description:
            'Waktu pemrosesan tergantung pada jenis dan jumlah pesanan. Umumnya, pesanan standar memerlukan waktu 3-5 hari kerja. Untuk kebutuhan mendesak, silakan hubungi kami untuk opsi ekspres.',
    },
];

export const FAQSection = () => {
    const [openCard, setOpenCard] = useState<Faq>(faqData[0]);

    return (
        <section className="py-16 bg-white">
            <div className="w-10/12 mx-auto">
                <h2 className="font-medium text-[28px] text-center  text-wrap leading-normal  xl:leading-[0.5%] mb-12">
                    Pertanyaan Seputar Titanium Printing
                </h2>
                {/* Card */}

                <div className="flex flex-col items-center justify-center gap-y-4">
                    {faqData &&
                        faqData.map((data) => (
                            <div key={data.id} className="w-full bg-white border rounded border-light-gray">
                                <button
                                    type="button"
                                    className="w-full h-auto p-6"
                                    onClick={() => setOpenCard({ id: data.id })}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg text-start font-base">{data.title}</h3>
                                        {openCard?.id === data.id ? (
                                            <IconMinus size={25} stroke={1.5} />
                                        ) : (
                                            <IconPlus size={25} stroke={1.5} />
                                        )}
                                    </div>
                                </button>
                                <div className={`${openCard?.id === data.id ? 'block' : 'hidden'} p-6 pt-0`}>
                                    <hr className="w-full mb-6 border border-light-gray" />
                                    <p className="text-base font-light leading-7 text-gray text-start">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};
