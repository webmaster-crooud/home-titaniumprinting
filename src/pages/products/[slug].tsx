import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { BACKEND, PUBLIC } from '../../../libs/utils';
import { Cart, Customer, NavBreadcrumbData, Product } from '../../../libs/type';
import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { ServicesCard } from '@/components/Card/Services.card';
import Image from 'next/image';
import { ProductHeaderCard } from '@/components/Header/ProductHeaderCard';
import { ProductForm } from '@/components/Form/Product.form';
import { SidebarProductCard } from '@/components/Card/SidebarProduct.card';
import { useEffect, useState } from 'react';
import { authAccount, cartAtom } from '../../../store/Atom';
import { useAtom, useAtomValue } from 'jotai';
import { TransactionForm } from '@/components/Form/Transaction.form';

interface ProductDetailData {
    product: Product;
    listProduct: Product[];
}

export default function ProductDetail({ data }: { data: ProductDetailData }) {
    const auth = useAtomValue(authAccount);
    const [cart, setCart] = useAtom(cartAtom);
    const [toTransaction, setToTransaction] = useState<boolean>(false);
    const navBreadcrumb: NavBreadcrumbData[] = [
        { title: 'List Produk', url: '/list-product' },
        { title: `${data?.product.name}` },
    ];

    useEffect(() => {
        const initialCart = {
            user: {
                email: auth?.email || '',
            },
            customer: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                address: {
                    name: '',
                    street: '',
                    city: '',
                    cityId: '',
                    province: '',
                    country: '',
                    postalCode: '',
                    building: '',
                },
            },
            product: {
                name: data.product.name,
                barcode: data.product.barcode,
            },
            delivery: {
                courier: '',
                price: 0,
                from: '',
                destination: '',
                weight: '',
                resi: '',
            },
            notes: '',
            email: '',
            productId: '',
            promotionCode: '',
            copies: 1,
            files: [],
            subTotalPrice: 0,
            finalTotalPrice: 0,
            finalTotalCogs: 0,
            status: '',
            totalWeight: '',
            productComponent: data.product.product_component.map((productComponent) => ({
                componentId: String(productComponent.component.id),
                componentName: productComponent.component.name,
                qualityId: null,
                sizeId: null,
                qty: productComponent.minQty,
                price: productComponent.component.qualities.length > 0 ? 0 : Number(productComponent.component.price),
                totalPriceComponent:
                    productComponent.component.qualities.length > 0 ? 0 : Number(productComponent.component.price),
                cogs: productComponent.component.qualities.length > 0 ? 0 : Number(productComponent.component.cogs),
                totalCogsComponent:
                    productComponent.component.qualities.length > 0 ? 0 : Number(productComponent.component.cogs),
                weight: 0,
            })),
        };
        setCart(initialCart);
    }, [data.product, setCart, auth?.email]);

    useEffect(() => {
        const calculateTotalWeight = () => {
            let totalWeight = 0;
            cart.productComponent.forEach((pc) => {
                if (pc.sizeId && pc.weight) {
                    totalWeight += Number(pc.weight) * pc.qty;
                }
            });
            return totalWeight * cart.copies;
        };

        const totalWeight = calculateTotalWeight();
        setCart((prevCart) => ({
            ...prevCart,
            totalWeight: totalWeight,
            delivery: {
                ...prevCart.delivery,
                weight: totalWeight,
            },
        }));
    }, [cart.productComponent, cart.copies, setCart]);

    useEffect(() => {
        const calculateTotal = () => {
            let totalPrice = 0;
            let totalCogs = 0;
            cart.productComponent.forEach((pc) => {
                totalPrice += pc.totalPriceComponent;
                totalCogs += pc.totalCogsComponent;
            });
            return { totalPrice, totalCogs };
        };

        const { totalPrice, totalCogs } = calculateTotal();
        const subTotalWithCopies = totalPrice * cart.copies;
        const deliveryPrice = cart.delivery.price || 0;
        const discountPrice = Number(cart.discount?.price) || 0;
        const finalTotalPrice = Number(subTotalWithCopies) + Number(deliveryPrice) - Number(discountPrice);

        setCart((prevCart) => ({
            ...prevCart,
            subTotalPrice: totalPrice,
            totalCogs: totalCogs,
            finalTotalPrice: finalTotalPrice,
        }));
    }, [cart.productComponent, cart.copies, cart.delivery.price, cart.discount?.price, setCart]);

    return (
        <>
            <SubMenuNavbar />
            <NavBreadcrumb data={navBreadcrumb} />

            <section className={`py-16 bg-white`}>
                <div className="w-10/12 mx-auto border rounded-lg border-light-gray">
                    <form className="grid items-start justify-center grid-cols-3">
                        <div className="col-span-2 p-6">
                            <ProductHeaderCard product={data.product} />

                            {toTransaction ? (
                                <TransactionForm />
                            ) : (
                                <ProductForm productComponent={data.product.product_component} />
                            )}

                            <div className="flex items-center justify-between w-full p-6 mt-5 border rounded border-light-gray bg-gradient-to-r from-white via-[#F4F7FF] to-[#D9DDFF]">
                                <div>
                                    <h3 className="font-medium">Kebutuhan anda tidak tersedia?</h3>
                                    <p className="text-sm text-gray">Silahkan hubungi kami untuk custom produk</p>
                                </div>

                                <Link
                                    href={'/'}
                                    className="px-4 py-2 font-semibold bg-white border rounded-lg shadow text-dark border-light-gray"
                                >
                                    Hubungi Kami
                                </Link>
                            </div>
                        </div>
                        <SidebarProductCard
                            cart={cart}
                            setCart={setCart}
                            setToTransaction={setToTransaction}
                            toTransaction={toTransaction}
                        />
                    </form>
                </div>
            </section>

            <section className="py-4 bg-white">
                <div className="w-10/12 mx-auto">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[28px] font-medium">Produk di Kategori Serupa</h2>
                        <Link
                            href={'/produk'}
                            className="text-lg font-medium transition-all duration-300 ease-in-out text-dark-primary hover:scale-95 hover:underline hover:underline-offset-4 hover:decoration-wavy hover:decoration-dark-primary"
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>Eksplor Produk</span>
                                <IconArrowRight size={20} stroke={2} />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-12">
                        {data.listProduct.map((list, index) => (
                            <ServicesCard
                                image={!list.cover ? '/assets/products/404.png' : `${PUBLIC}/cover/${list?.cover}`}
                                link={`/produk/${list.slug}`}
                                title={list.name}
                                description={list.description}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slug } = context.params!;
    try {
        const response = await fetch(`${BACKEND}/products/${slug}`);
        const { data, error } = await response.json();

        if (error) {
            return {
                notFound: true,
            };
        }

        return {
            props: { data },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
};
