import React, { useCallback, useEffect, useState } from 'react';
import { Cart, DiscountData } from '../../../libs/type';
import { mapCartToProductDetails } from '../../../libs/cartUtils';
import { BACKEND, formatCurrency, formatDateTIme, formatDeliveryTime } from '../../../libs/utils';
import {
    IconArrowLeft,
    IconCircle,
    IconCreditCardPay,
    IconLoader3,
    IconShoppingBag,
    IconTicket,
} from '@tabler/icons-react';

import { useAtomValue } from 'jotai';
import { authAccount } from '../../../store/Atom';
import { useRouter } from 'next/router';
import { AuthModal } from '../Modal/Auth.modal';
import { DeliveryAddressModal } from '../Modal/DeliveryAddress.modal';
import { fetchWithAuth } from '../../../libs/fetchWithAuth';
import { useAuthToken } from '../../../hooks/useAuthToken';
import { v4 as uuid } from 'uuid';

type PropsSidebarProductCard = {
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    setToTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    toTransaction: boolean;
};

interface DataOrderDetail {
    componentName: string; // Nama produk
    qualityName: string; // Kualitas (jika ada)
    sizeName: string; // Size (jika ada)
    price: number; // Harga per item
    qty: number; // Jumlah kuantitas
    totalPrice: number; // Total harga (price * qty)
}

export const SidebarProductCard: React.FC<PropsSidebarProductCard> = ({
    cart,
    setCart,
    setToTransaction,
    toTransaction,
}) => {
    const auth = useAtomValue(authAccount);
    const router = useRouter();
    const { getValidToken } = useAuthToken();
    const [dataOrderDetail, setDataOrderDetail] = useState<DataOrderDetail[]>([]);
    const [inputDiscount, setInputDiscount] = useState<string>('');
    const [discount, setDiscount] = useState<DiscountData | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ field: string; message: string }>({ field: '', message: '' });
    const [modal, setModal] = useState<{ field: string } | undefined>(undefined);
    const handleDiscount = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await fetch(`${BACKEND}/promotions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: inputDiscount,
                }),
            });
            const result = await response.json();
            const { data }: { data: DiscountData } = result;
            if (result.error) {
                setError({ field: 'promotions', message: `${result.message}` });
            } else {
                let discountPrice: number | string = 0;

                // Hitung diskon berdasarkan subTotalPrice (tanpa dikalikan copies)
                if (data.price) {
                    discountPrice = data.price;
                } else if (data.percent) {
                    discountPrice = (Number(data.percent) / 100) * cart.subTotalPrice;
                }

                // Perbarui state cart dengan diskon baru
                setCart((prevCart) => ({
                    ...prevCart,
                    discount: {
                        code: data.code,
                        percent: data.percent,
                        price: discountPrice,
                    },
                }));

                setDiscount(data);
                setError({ field: '', message: '' });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const [modalAuth, setModalAuth] = useState<boolean>(false);

    useEffect(() => {
        const mappedValueComponents = mapCartToProductDetails(cart.productComponent);
        setDataOrderDetail(mappedValueComponents);
    }, [cart]);

    const handlerSaveToCart = async () => {
        setLoading(true);
        try {
            if (cart.subTotalPrice === 0) {
                console.log('KOSONG');
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (!auth) {
                setModalAuth(true);
            } else {
                const response = await fetchWithAuth(getValidToken, `${BACKEND}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: auth.email,
                        notes: cart.notes,
                        copies: cart.copies,
                        productId: cart.product.barcode,
                        subTotalPrice: cart.subTotalPrice,
                        // finalTotalCogs: cart.totalCogs,
                        // finalTotalPrice: cart.finalTotalPrice,
                        // promotionCode: cart.discount?.code,
                        totalWeight: cart.totalWeight,
                        cartItems: cart.productComponent.map((pc) => ({
                            componentName: String(pc.componentName),
                            qualityName: String(pc.qualityId),
                            sizeName: String(pc.sizeId),
                            qty: pc.qty,
                            price: pc.price,
                            cogs: pc.cogs,
                            totalPrice: pc.totalPriceComponent,
                            totalCogs: pc.totalCogsComponent,
                            weight: pc.weight,
                        })),
                    }),
                });
                const result = await response.json();
                if (result.error) {
                    console.error(result.message);
                } else {
                    router.push('/member/keranjang');
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const clearCart = () => {
        setCart({
            product: {
                name: '',
                barcode: '',
                slug: '',
                cover: '',
                description: '',
            },
            delivery: {
                courier: '',
                price: 0,
                from: '',
                destination: '',
                weight: '',
            },
            email: '',
            productId: '',
            notes: '',
            copies: 1,
            files: [],
            subTotalPrice: 0,
            finalTotalPrice: 0,
            promotionCode: '',
            status: '',
            totalWeight: '',
            productComponent: [],
            customer: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: {
                    name: 'Utama',
                    street: '',
                    city: '',
                    cityId: '',
                    province: '',
                    country: 'Indonesia',
                    postalCode: '',
                    building: '',
                },
            },

            user: {
                email: '',
            },
        });
    };

    const handlerCheckout = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const data = {
                notes: cart.notes,
                copies: cart.copies,
                productId: cart.product.barcode,
                subTotalPrice: cart.subTotalPrice,
                finalTotalCogs: cart.totalCogs,
                finalTotalPrice: Number(cart.finalTotalPrice),
                promotionCode: String(cart.discount?.code),
                totalWeight: cart.totalWeight,
                cartItems: cart.productComponent.map((pc) => ({
                    componentName: String(pc.componentName),
                    qualityName: String(pc.qualityId),
                    sizeName: String(pc.sizeId),
                    qty: pc.qty,
                    price: pc.price,
                    cogs: pc.cogs,
                    totalPrice: pc.totalPriceComponent,
                    totalCogs: pc.totalCogsComponent,
                    weight: pc.weight,
                })),
                delivery: {
                    from: cart.delivery.from,
                    destination: cart.delivery.destination,
                    weight: Number(cart.delivery.weight),
                    courier: cart.delivery.courier,
                    code: `DELIVER-${formatDeliveryTime(new Date())}-${uuid()}`,
                    etd: cart.delivery.etd,
                    service: cart.delivery.service,
                    price: cart.delivery.price,
                },
                customer: {
                    email: cart.customer.email,
                    firstName: cart.customer.firstName,
                    lastName: cart.customer.lastName,
                    phone: cart.customer.phone,
                    address: {
                        street: cart.customer.address.street,
                        city: cart.customer.address.city,
                        cityId: cart.customer.address.cityId,
                        province: cart.customer.address.province,
                        country: cart.customer.address.country,
                        postalCode: cart.customer.address.postalCode,
                        building: cart.customer.address.building,
                        name: cart.customer.address.name,
                    },
                },
            };

            const response = await fetch(`${BACKEND}/transaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            // Jika ada error, tampilkan pesan error
            if (result.error) {
                console.error(result.message);
                alert(result.message); // Tampilkan alert untuk user
            } else if (result.data.payment && result.data.payment.redirect_url) {
                console.log(result.message);

                // Jika transaksi berhasil, ambil redirect_url dari respons backend
                const { redirect_url } = result.data.payment;

                console.log(result.data.payment);
                clearCart();
                // Redirect pengguna ke halaman pembayaran Midtrans
                window.location.href = redirect_url;
            } else {
                console.error('Payment data not found in response.');
                alert('Payment failed. Please try again.'); // Tampilkan alert untuk user
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.'); // Tampilkan alert untuk user
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-full border-l border-light-gray bg-white-primary">
                <div className="relative flex-1 px-4 py-5">
                    <div className="sticky z-[1] top-5">
                        <h4 className="text-lg font-medium">Order Detail</h4>
                        <div className="flex flex-col p-6 gap-y-3">
                            {dataOrderDetail.map((data, index) => (
                                <div key={index}>
                                    {/* Nama Produk */}
                                    <div className="flex items-center justify-between">
                                        <p className="flex items-center justify-start gap-1 font-medium text-dark-primary">
                                            <IconCircle size={13} stroke={4} />
                                            <span>{data.componentName}</span>
                                        </p>
                                        <span className="text-sm">
                                            {formatCurrency.format(data.totalPrice)} {/* Total harga */}
                                        </span>
                                    </div>

                                    {/* Kualitas (jika ada) */}
                                    {data.qualityName && (
                                        <div className="flex items-center justify-between text-sm ms-4">
                                            <p className="font-light text-gray">{data.qualityName}</p>
                                        </div>
                                    )}

                                    {/* Size (jika ada) */}
                                    {data.sizeName && (
                                        <div className="flex items-center justify-between text-sm ms-4">
                                            <p className="font-light text-gray">{data.sizeName}</p>
                                        </div>
                                    )}

                                    {/* Harga per item dan jumlah kuantitas */}
                                    <div className="flex items-center justify-between text-sm ms-4">
                                        <p className="font-light text-gray">
                                            {formatCurrency.format(data.price)} x {data.qty}
                                            {/* Harga per item x qty */}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bagian total harga, ongkir, dan tombol checkout */}
                <div className="p-6 bg-white border-t border-light-gray">
                    <div className="flex flex-col gap-2">
                        {toTransaction && (
                            <>
                                <div>
                                    <div className="relative flex items-center w-full overflow-hidden border rounded-lg border-light-gray bg-white-primary">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-sm outline-none bg-white-primary"
                                            placeholder="KODE PROMO"
                                            value={inputDiscount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setInputDiscount(e.target.value)
                                            }
                                        />
                                        <button
                                            disabled={loading}
                                            className="px-4 py-2 text-white bg-dark-primary disabled:opacity-70"
                                            onClick={handleDiscount}
                                        >
                                            {loading ? (
                                                <IconLoader3 className="animate-spin" size={20} stroke={2} />
                                            ) : (
                                                <IconTicket size={20} stroke={2} />
                                            )}
                                        </button>
                                    </div>
                                    {error.field === 'promotions' && (
                                        <small className="text-xs text-danger">{error.message}</small>
                                    )}
                                </div>
                                <DeliveryAddressModal modal={modal} setModal={setModal} />
                                {cart?.delivery?.price !== 0 && (
                                    <div className="flex items-center justify-between w-full">
                                        <p className="font-light text-gray">Ongkir</p>
                                        <span>{formatCurrency.format(Number(cart?.delivery?.price) || 0)}</span>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex items-start justify-between w-full">
                            <p className="font-light text-gray">Sub Total</p>
                            <div className="flex flex-col justify-end">
                                <span>
                                    {formatCurrency.format(Number(cart.subTotalPrice) || 0)} x {cart.copies}
                                </span>
                                <span className="text-end">
                                    {formatCurrency.format(Number(cart.subTotalPrice) * Number(cart.copies) || 0)}
                                </span>
                            </div>
                        </div>

                        {discount?.code && (
                            <div className="flex items-center justify-between w-full">
                                <p className="font-light text-gray">Diskon</p>
                                <span>-{formatCurrency.format(Number(cart.discount?.price) || 0)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between w-full">
                            <p className="font-light text-gray">Total Biaya</p>
                            <span>{formatCurrency.format(Number(cart.finalTotalPrice) || 0)}</span>
                        </div>

                        <div className="grid justify-center grid-cols-2 gap-3">
                            {toTransaction ? (
                                <button
                                    className="flex items-center justify-between w-full gap-2 px-5 py-3 font-medium text-center bg-white border rounded-md border-light-gray disabled:opacity-70"
                                    type="button"
                                    disabled={loading}
                                    onClick={() => {
                                        setToTransaction(false);
                                        setCart({ ...cart });
                                    }}
                                >
                                    <IconArrowLeft size={50} stroke={1.3} className="w-6/12" />

                                    <span className="w-full text-sm text-end">Kembali</span>
                                </button>
                            ) : (
                                <button
                                    className="flex items-center justify-between w-full gap-2 px-5 py-3 font-medium text-center bg-white border rounded-md border-light-gray disabled:opacity-70"
                                    type="button"
                                    disabled={loading}
                                    onClick={handlerSaveToCart}
                                >
                                    {loading ? (
                                        <IconLoader3 size={50} stroke={1.3} className="w-6/12 animate-spin" />
                                    ) : (
                                        <IconShoppingBag size={50} stroke={1.3} className="w-6/12" />
                                    )}
                                    <span className="w-full text-sm text-end">Simpan Keranjang</span>
                                </button>
                            )}
                            {toTransaction ? (
                                <button
                                    type="button"
                                    onClick={handlerCheckout}
                                    className="flex items-center justify-between w-full gap-2 px-5 py-3 font-medium text-center border rounded-md bg-dark-primary text-light-primary border-dark-primary"
                                >
                                    <span className="w-full text-sm text-start">Checkout</span>
                                    <IconCreditCardPay size={50} stroke={1.3} className="w-6/12" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (cart.subTotalPrice === 0 && cart.totalWeight === 0) {
                                            console.log('KOSONG');
                                            return;
                                        }
                                        setToTransaction(true);
                                    }}
                                    className="flex items-center justify-between w-full gap-2 px-5 py-3 font-medium text-center border rounded-md bg-dark-primary text-light-primary border-dark-primary"
                                >
                                    <span className="w-full text-sm text-start">Transaksi</span>
                                    <IconCreditCardPay size={50} stroke={1.3} className="w-6/12" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AuthModal modalAuth={modalAuth} setModalAuth={setModalAuth} />
        </>
    );
};
