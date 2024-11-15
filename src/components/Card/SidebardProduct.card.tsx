import React, { useEffect, useState } from 'react';
import { Cart, Product } from '../../../libs/type';
import { mapCartToProductDetails } from '../../../libs/cartUtils';
import { formatCurrency } from '../../../libs/utils';
import { IconCircle } from '@tabler/icons-react';
import { ModalDeliveryAddress } from '../Modal/DeliveryAddress.modal';
import { PaymentModal } from '../Modal/Payment.modal';

type propsSidebarProductCard = {
    product?: Product;
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

interface DataOrderDetail {
    componentName: string;
    qualityName: string;
    sizePrice: number | string | null;
    componentPrice: number | string | null;
    componentId: string;
    qualityId: string | number | null;
    sizeId: string | number | null;
    qty: number;
}

export const SidebarProductCard: React.FC<propsSidebarProductCard> = ({ cart, product, setCart }) => {
    const [dataOrderDetail, setDataOrderDetail] = useState<DataOrderDetail[]>([]);
    const [modalDelivery, setModalDelivery] = useState(false);
    const [modalPayment, setModalPayment] = useState(false);

    useEffect(() => {
        const mappedValueComponents = product
            ? mapCartToProductDetails(cart.productDetail?.productComponent || [], product)
            : [];
        setDataOrderDetail(mappedValueComponents);
    }, [product, cart]);

    return (
        <div className="flex flex-col w-full h-full border-l border-light-gray bg-white-primary">
            <div className="relative flex-1 px-4 py-5">
                <div className="sticky z-[1] top-5">
                    <h4 className="text-lg font-medium">Order Detail</h4>
                    <div className="flex flex-col p-6 gap-y-3">
                        {dataOrderDetail.map((data, index) => (
                            <React.Fragment key={index}>
                                {data.componentPrice ? (
                                    <div className="flex items-center justify-between">
                                        <p className="flex items-center justify-start gap-1 font-medium text-dark-primary">
                                            <IconCircle size={13} stroke={4} />
                                            <span>{data.componentName}</span>
                                        </p>
                                        <span className="text-sm">
                                            {formatCurrency.format(Number(data.componentPrice))}
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="flex items-center justify-start gap-1 font-medium text-dark-primary">
                                            <IconCircle size={13} stroke={4} />
                                            <span>{data.componentName}</span>
                                        </p>
                                        <div className="flex items-center justify-between text-sm ms-4">
                                            {data.qualityName && (
                                                <p className="font-light text-gray">{data.qualityName}</p>
                                            )}
                                            {data.sizePrice && (
                                                <span className="text-sm">
                                                    {formatCurrency.format(Number(data.sizePrice) * Number(data.qty))}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            {/* Footer tetap di bawah */}
            <div className="p-6 bg-white border-t border-light-gray">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between w-full">
                        <p className="font-light text-gray">Ongkir</p>
                        <span>{formatCurrency.format(Number(cart.user?.delivery?.price))}</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="font-light text-gray">Sub Total</p>
                        <span>{formatCurrency.format(Number(cart.subTotal))}</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="font-light text-gray">Total Biaya</p>
                        <span>{formatCurrency.format(Number(cart.totalPrice))}</span>
                    </div>

                    <ModalDeliveryAddress
                        product={product}
                        cart={cart}
                        setCart={setCart}
                        modalDelivery={modalDelivery}
                        setModalDelivery={setModalDelivery}
                    />
                    {cart.user?.delivery.price !== 0 && (
                        <PaymentModal
                            setModalPayment={setModalPayment}
                            modalPayment={modalPayment}
                            setCart={setCart}
                            cart={cart}
                        />
                    )}

                    <button className="w-full px-6 py-4 font-medium text-center bg-white border rounded-md border-light-gray">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
