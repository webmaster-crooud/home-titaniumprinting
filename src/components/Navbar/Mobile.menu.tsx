import {
    IconHelpCircle,
    IconMenu2,
    IconSearch,
    IconShoppingBag,
    IconSignRight,
    IconUserCheck,
    IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { DefaultButton } from '../Button';
import { authAccount } from '../../../store/Atom';
import { useAtomValue } from 'jotai';

export default function MobileMenu() {
    const [modalMenu, setModalMenu] = useState<boolean>(false);
    const auth = useAtomValue(authAccount);
    return (
        <>
            <button type="button" className="block px-1 py-0.5 border rounded-md md:hidden border-dark">
                <IconMenu2 onClick={() => setModalMenu(true)} stroke={2} size={25} className="text-dark" />
            </button>

            {modalMenu && (
                <motion.section
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: '0', opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-white"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-5 p-5 bg-white">
                        <Link href="/">
                            <Image
                                alt="Titanium Printing logo"
                                src="/assets/logo.png"
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                            <h1 className="sr-only">Titanium Printing</h1>
                        </Link>

                        <button type="button" onClick={() => setModalMenu(false)}>
                            <IconX stroke={2} size={30} className="text-dark" />
                        </button>
                    </div>

                    <motion.div className="px-3">
                        <form className="flex items-center justify-center">
                            <input
                                type="text"
                                className="w-full px-3 py-3 border border-r-0 rounded-md rounded-r-none outline-none border-light-gray"
                                placeholder="Cari Produk"
                            />
                            <button className="px-3 py-3 border border-l-0 rounded-md rounded-l-none border-light-gray">
                                <IconSearch size={24} stroke={2} />
                            </button>
                        </form>
                    </motion.div>

                    <div className="flex flex-col items-start mt-5 gap-y-8">
                        <DefaultButton link="/" title="Cara Kerja" icon={<IconHelpCircle size={28} stroke={1.6} />} />
                        <Link
                            href={'/member/keranjang'}
                            className={`rounded-md px-4 py-1.5 duration-300 text-dark  ease-in-out  transition-all hover:underline hover:decoration-wavy hover:scale-105 flex items-center justify-center gap-2 underline-offset-4 decoration-dark-primary`}
                        >
                            <IconShoppingBag stroke={1.6} size={28} />
                            <span>Keranjang</span>
                        </Link>
                        {auth.email ? (
                            <DefaultButton
                                link={`/member/${auth.email}`}
                                title={
                                    <span className="flex items-center justify-center gap-2">
                                        <IconUserCheck size={28} stroke={1.8} />
                                        {auth.firstName}
                                    </span>
                                }
                            />
                        ) : (
                            <DefaultButton
                                link="/login"
                                title={
                                    <span className="flex items-center justify-center gap-2">
                                        <IconSignRight size={28} stroke={1.8} />
                                        Masuk
                                    </span>
                                }
                            />
                        )}
                    </div>
                </motion.section>
            )}
        </>
    );
}
