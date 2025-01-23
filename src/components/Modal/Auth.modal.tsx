import { useRouter } from 'next/router';
import { DefaultCard } from '../Card';
import React, { SetStateAction } from 'react';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';

type propsAuthModal = {
    modalAuth: boolean;
    setModalAuth: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthModal: React.FC<propsAuthModal> = ({ modalAuth, setModalAuth }) => {
    return (
        modalAuth && (
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center w-full h-screen bg-dark/10 backdrop-blur">
                <div className="w-6/12">
                    <DefaultCard padding border>
                        <div className="flex items-center justify-between mb-3">
                            <h6 className="text-lg font-semibold text-dark-primary">Anda belum masuk?</h6>
                            <button type="button" onClick={() => setModalAuth(false)}>
                                <IconX size={25} stroke={2} />
                            </button>
                        </div>
                        <p className="w-10/12 text-sm font-normal leading-5 text-gray">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque repudiandae non et,
                            exercitationem placeat facere?
                        </p>

                        <div className="flex items-center justify-center w-10/12 gap-3 mx-auto mt-5">
                            <Link
                                href={'/login'}
                                className="px-5 py-2 font-semibold text-white border rounded-lg bg-dark-primary border-dark-primary"
                            >
                                Masuk Member
                            </Link>

                            <Link
                                href={'/register'}
                                className="px-5 py-2 font-semibold bg-white border rounded-lg text-dark-primary border-dark-primary"
                            >
                                Daftar Member
                            </Link>
                        </div>
                    </DefaultCard>
                </div>
            </div>
        )
    );
};
