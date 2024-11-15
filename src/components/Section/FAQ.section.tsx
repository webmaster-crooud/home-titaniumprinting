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
        <section className="bg-white py-16">
            <div className="w-10/12 mx-auto">
                <h2 className="font-medium text-[28px] text-center leading-[0.5%] mb-12">Pertanyaan Seputar Titanium Printing</h2>
                {/* Card */}

                <div className="flex items-center justify-center flex-col gap-y-4">
                    {faqData &&
                        faqData.map((data) => (
                            <div key={data.id} className="bg-white border border-light-gray rounded w-full">
                                <button type="button" className="w-full h-auto p-6" onClick={() => setOpenCard({ id: data.id })}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-base text-lg">{data.title}</h3>
                                        {openCard?.id === data.id ? <IconMinus size={25} stroke={1.5} /> : <IconPlus size={25} stroke={1.5} />}
                                    </div>
                                </button>
                                <div className={`${openCard?.id === data.id ? 'block' : 'hidden'} p-6 pt-0`}>
                                    <hr className="border border-light-gray w-full mb-6" />
                                    <p className="text-base font-light text-gray text-start leading-7">{data.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};
