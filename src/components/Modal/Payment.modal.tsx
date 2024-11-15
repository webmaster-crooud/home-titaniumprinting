import React from 'react';
import { Cart } from '../../../libs/type';
import { IconX } from '@tabler/icons-react';

type propsPaymentModal = {
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    setModalPayment: React.Dispatch<React.SetStateAction<boolean>>;
    modalPayment: boolean;
};

export const PaymentModal: React.FC<propsPaymentModal> = ({ cart, setCart, setModalPayment, modalPayment }) => {
    return (
        <>
            <button
                type="button"
                onClick={() => setModalPayment(true)}
                className="w-full px-6 py-4 font-medium text-center text-white border rounded-md bg-dark-primary border-dark-primary"
            >
                Pembayaran
            </button>

            {modalPayment && (
                <div className="fixed top-0 left-0 right-0 z-10 flex items-start justify-center w-full h-screen pt-10 overflow-y-scroll bg-dark/10 backdrop-blur-sm">
                    <div className="w-6/12 px-10 py-5 mx-auto border shadow-lg rounded-xl border-light-gray bg-white-primary gap-y-3">
                        <button type="button" onClick={() => setModalPayment(false)}>
                            <IconX />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
