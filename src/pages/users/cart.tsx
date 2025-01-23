import { useCallback, useEffect, useState } from 'react';
import { useAuthToken } from '../../../hooks/useAuthToken';
import { Cart, NavBreadcrumbData } from '../../../libs/type';
import { fetchWithAuth } from '../../../libs/fetchWithAuth';
import { AUTH, BACKEND, formatCurrency, PUBLIC } from '../../../libs/utils';
import { useAtomValue } from 'jotai';
import { authAccount } from '../../../store/Atom';
import Head from 'next/head';
import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';
import {
    IconCreditCard,
    IconLoader3,
    IconPower,
    IconSearch,
    IconShoppingBagCheck,
    IconTrash,
    IconUserFilled,
} from '@tabler/icons-react';

import { DefaultPagination } from '@/components/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { UserLayouts } from '@/layouts/User';

export default function CartPage() {
    const { getValidToken } = useAuthToken();
    const auth = useAtomValue(authAccount);
    const [userCart, setUserCart] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<{ field: string } | undefined>(undefined);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const navBreadcrumb: NavBreadcrumbData[] = [{ title: 'Member', url: '/member' }, { title: 'List Produk' }];

    const fetchUserCart = useCallback(async () => {
        setLoading({ field: 'fetching' });
        try {
            const response = await fetchWithAuth(getValidToken, `${BACKEND}/users/cart`, {
                method: 'GET',
            });
            const result = await response.json();
            if (result.error) {
                console.error(result.message);
            } else {
                console.log(result.data);
                setUserCart(
                    result.data.map((cart: any) => ({
                        id: cart.id,

                        product: {
                            name: cart.product.name,
                            barcode: cart.productBarcode,
                            slug: cart.product.slug,
                            cover: cart.product.cover,
                            description: cart.product.description,
                        },
                        notes: cart.notes,
                        copies: cart.copies,
                        subTotalPrice: cart.subTotalPrice,
                        // totalCogs: cart.totalCogs,
                        finalTotalPrice: Number(cart.subTotalPrice) * Number(cart.copies),
                        // discount: cart.promotionCode,
                        totalWeight: cart.totalWeight,
                        status: cart.status,
                        productComponent: cart.cartItems.map((items: any) => ({
                            componentId: items.componentName,
                            componentName: items.componentName,
                            qualityId: items.qualityName,
                            sizeId: items.sizeId,
                            cogs: items.cogs,
                            qty: items.qty,
                            price: items.price,
                            totalPriceComponent: items.totalPriceComponent,
                            totalCogsComponent: items.totalCogsComponent,
                            weight: items.weight,
                        })),
                    })),
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(undefined);
        }
    }, [getValidToken]);

    useEffect(() => {
        fetchUserCart();
    }, [fetchUserCart]);

    const handlerSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading({ field: 'search' });
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await fetch(`${BACKEND}/products?search=${search}`);
            const result = await response.json();
            setUserCart(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(undefined);
        }
    };

    const handleDeleteCart = async (cartId: string | number) => {
        setLoading({ field: 'deletedCart' });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await fetchWithAuth(getValidToken, `${BACKEND}/users/cart/${cartId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.error) {
                console.log(result.message);
            } else {
                fetchUserCart();
                console.log(result.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(undefined);
        }
    };

    return (
        <>
            <Head>
                <title>Titanium Printing | Keranjang {auth?.email}</title>
            </Head>

            <UserLayouts navBreadcrumb={navBreadcrumb}>
                <div className="w-full p-5">
                    <h2 className="text-lg font-medium text-dark-primary">
                        Keranjang {auth?.firstName + ' ' + auth?.lastName}
                    </h2>
                    <div className="flex items-center justify-between gap-6 mt-2 mb-7">
                        <div className="w-full">
                            <form className="flex items-center justify-star" onSubmit={handlerSearch}>
                                <input
                                    className="w-full px-4 py-3 text-sm border border-r-0 rounded-md rounded-r-none outline-none border-light-gray bg-white-primary"
                                    placeholder="Cari nama produk..."
                                    value={search}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="flex items-center justify-center p-3 border border-l-0 rounded-md rounded-l-none border-light-gray bg-white-primary"
                                >
                                    {loading ? (
                                        <IconLoader3 size={20} className="text-dark-primary animate-spin" stroke={2} />
                                    ) : (
                                        <IconSearch size={20} className="text-dark-primary" stroke={2} />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-5 pb-5">
                        {userCart.length !== 0 ? (
                            userCart.map((cart, index) => (
                                <div
                                    key={index}
                                    className="w-full border rounded-lg shadow bg-white-primary border-light-gray"
                                >
                                    <div className="grid grid-cols-3 gap-5 px-4 py-3">
                                        <Image
                                            src={
                                                cart.product.cover
                                                    ? `${PUBLIC}/cover/${cart.product.cover}`
                                                    : '/assets/products/404.png'
                                            }
                                            alt={'Produk ' + cart.product.name}
                                            width={300}
                                            height={300}
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                            priority
                                            className="rounded-lg"
                                        />
                                        <div className="relative col-span-2">
                                            <div className="flex items-start justify-between gap-5">
                                                <div>
                                                    <h2 className="mb-1 text-lg font-semibold text-dark-primary">
                                                        {cart.product.name}
                                                    </h2>
                                                    <p className="text-sm text-gray">{cart.product.description}</p>
                                                </div>
                                                <span
                                                    className={`px-5 py-1.5 text-[10px] tracking-widest font-semibold bg-blue text-white rounded-full`}
                                                >
                                                    {cart.status}
                                                </span>
                                            </div>
                                            <p className="absolute bottom-0 font-semibold text-dark-primary">
                                                Harga:{' '}
                                                <span className="font-normal">
                                                    {formatCurrency.format(cart.finalTotalPrice)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end col-span-3 gap-3 px-4 py-3 border-t-2 border-light-gray">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCart(String(cart.id))}
                                            disabled={loading?.field === 'deletedCart'}
                                            className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-white rounded bg-danger disabled:opacity-60"
                                        >
                                            {loading?.field === 'deletedCart' ? (
                                                <>
                                                    <IconLoader3 className="animate-spin" strokeOpacity={2} size={18} />
                                                    <span>Menghapus...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <IconTrash strokeOpacity={2} size={18} /> <span>Hapus</span>
                                                </>
                                            )}
                                        </button>
                                        <Link
                                            href={`/produk/${cart.product.slug}`}
                                            className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-white rounded bg-dark-primary"
                                        >
                                            <IconCreditCard strokeOpacity={2} size={18} /> Pesan
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>KOSONG</>
                        )}
                    </div>
                    <DefaultPagination />
                </div>
            </UserLayouts>
        </>
    );
}
