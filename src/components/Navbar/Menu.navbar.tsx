import { IconHelpCircle, IconShoppingBag, IconUser, IconUserCheck } from '@tabler/icons-react';
import { DefaultButton } from '../Button';
import { useAtomValue } from 'jotai';
import { authAccount } from '../../../store/Atom';
import Link from 'next/link';

export const MenuNavbar = () => {
    const auth = useAtomValue(authAccount);
    return (
        <div className="flex items-center justify-end gap-5">
            <div className="flex items-center gap-1 px-5 border-r jusitify-center border-light-gray">
                <DefaultButton link="/" title="Cara Kerja" icon={<IconHelpCircle size={28} stroke={1.6} />} />
                <Link
                    href={'/member/keranjang'}
                    className={`bg-white rounded-md px-4 py-1.5 duration-300 text-dark  ease-in-out  transition-all hover:underline hover:decoration-wavy hover:scale-105 flex items-center justify-center gap-2 underline-offset-4 decoration-dark-primary`}
                >
                    <IconShoppingBag stroke={1.6} size={28} />
                    <span>Keranjang</span>
                </Link>
            </div>
            {auth ? (
                <DefaultButton
                    link={`/member/${auth.email}`}
                    title={
                        <span className="flex items-center justify-center gap-1">
                            <IconUserCheck size={20} stroke={2.2} />
                            {auth.firstName}
                        </span>
                    }
                />
            ) : (
                <DefaultButton link="/login" title="Masuk" />
            )}
        </div>
    );
};
