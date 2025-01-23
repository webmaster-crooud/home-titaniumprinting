import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { BACKEND, PUBLIC } from '../../../libs/utils';
import { Cart, Categories, Data, NavBreadcrumbData, Product } from '../../../libs/type';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { ProductCategoriesBadges, ProductServicesBadges } from '@/components/Badges/Product.badges';
import { IconArrowRight, IconMoodSmile, IconSparkles, IconThumbUp } from '@tabler/icons-react';
import React, { useState } from 'react';
import { ProductHeaderCard } from '@/components/Header/ProductHeaderCard';
import { SidebarProductCard } from '@/components/Card/SidebardProduct.card';
import { ProductForm } from '@/components/Form/Product.form';
import Link from 'next/link';
import { ServicesCard } from '@/components/Card/Services.card';

export default function ProductsDetail({ product }: { product: Product }) {
    const [cart, setCart] = useState<Cart>({
        account: {
            username: 'Mikael',
            addressId: null,
        },
        user: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                building: '',
                city: '',
                name: '',
                postalCode: '',
                province: '',
                street: '',
                country: '',
            },
            delivery: {
                courier: '',
                price: 0,
                resi: '',
            },
        },
        files: undefined,
        notes: '',
        productDetail: {
            barcode: '',
            productComponent: [],
        },
        totalPriceComponent: 0,
        totalCogs: 0,
        totalPrice: 0,
        subTotal: 0,
        totalQty: 0,
    });

    const navBreadcrumb: NavBreadcrumbData[] = [
        { title: 'List Produk', url: '/list-product' },
        { title: `${product?.name}` },
    ];

    return (
        <>
            <SubMenuNavbar />
            <NavBreadcrumb data={navBreadcrumb} />

            <section className="py-16 bg-white">
                <div className="w-10/12 mx-auto border rounded-lg border-light-gray">
                    <form className="grid items-start justify-start grid-cols-3">
                        <div className="col-span-2 p-6">
                            <ProductHeaderCard product={product} />
                            {/* Form Cart */}
                            <ProductForm
                                product={product}
                                barcode={`${product?.barcode}`}
                                cart={cart}
                                setCart={setCart}
                            />
                        </div>

                        <SidebarProductCard cart={cart} product={product} setCart={setCart} />
                    </form>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="w-10/12 mx-auto">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[28px] font-medium">Produk di Kategori Serupa</h2>
                        <Link
                            href={''}
                            className="text-lg font-medium transition-all duration-300 ease-in-out text-dark-primary hover:scale-95 hover:underline hover:underline-offset-4 hover:decoration-wavy hover:decoration-dark-primary"
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>Eksplor Produk</span>
                                <IconArrowRight size={20} stroke={2} />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-12">
                        <ServicesCard
                            image="/assets/products/image.png"
                            link="/"
                            title="Kalender Poster"
                            description={'Deskirpsi'}
                        />
                        <ServicesCard
                            image="/assets/products/image.png"
                            link="/"
                            title="Kalender Poster"
                            description={'Deskirpsi'}
                        />
                        <ServicesCard
                            image="/assets/products/image.png"
                            link="/"
                            title="Kalender Poster"
                            description={'Deskirpsi'}
                        />
                        <ServicesCard
                            image="/assets/products/image.png"
                            link="/"
                            title="Kalender Poster"
                            description={'Deskirpsi'}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug } = ctx?.params!;
    if (typeof slug !== 'string') {
        return {
            notFound: true,
        };
    }
    try {
        const responseProduct = await fetch(`${BACKEND}/products/${slug}`);
        const resultProduct = await responseProduct.json();

        const product: Product = resultProduct.data;
        if (!product) {
            return {
                notFound: true, // Jika tidak ada data, tampilkan halaman 404
            };
        }

        return {
            props: {
                product,
            },
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return {
            notFound: true, // Tampilkan 404 jika terjadi error
        };
    }
};
