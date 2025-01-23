import { Categories, Data, NavBreadcrumbData, Product } from '../../../libs/type';
import { BACKEND, PUBLIC } from '../../../libs/utils';
import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';
import {
    IconAdjustmentsDollar,
    IconFlame,
    IconFolderFilled,
    IconLoader3,
    IconRefresh,
    IconSearch,
    IconThumbUp,
} from '@tabler/icons-react';
import { ServicesCard } from '@/components/Card/Services.card';
import { DefaultPagination } from '@/components/Pagination';
import Head from 'next/head';
import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { alertShow } from '../../../store/Atom';

export default function ProductPage({ data }: { data: Product[] }) {
    const navBreadcrumb: NavBreadcrumbData[] = [{ title: 'List Produk' }];
    const [products, setProducts] = useState<Product[]>(data);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const setAlert = useSetAtom(alertShow);

    console.log(products);

    const handlerSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await fetch(`${BACKEND}/products?search=${search}`);
            const result = await response.json();
            setProducts(result.data);
        } catch (error) {
            setAlert({ type: 'error', message: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Head>
                <title>Titanium Printing | List Produk</title>
            </Head>
            <SubMenuNavbar />

            {/* Breadcrumb */}
            <NavBreadcrumb data={navBreadcrumb} />

            {/* Content Products */}
            <section className="py-16 bg-white">
                <div className="relative w-11/12 mx-auto">
                    <div className="flex justify-center border rounded-lg border-light-gray">
                        <div className="top-0 p-5 border-r w-80 bg-white-primary border-light-gray">
                            <h3 className="text-base font-semibold text-dark-primary">Pilih Kategori</h3>
                            <ul className="flex flex-col mt-5 gap-y-3">
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3">
                                        <IconFolderFilled size={18} className="text-blue" />{' '}
                                        <span className="text-sm">Self Staker</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="w-full p-5">
                            <h2 className="text-lg font-medium text-dark-primary">List Produk Titanium Printing</h2>
                            <div className="flex items-center justify-between gap-6 mt-2 mb-7">
                                <div className="w-full">
                                    <form className="flex items-center justify-star" onSubmit={handlerSearch}>
                                        <input
                                            className="w-full px-4 py-3 text-sm border border-r-0 rounded-md rounded-r-none outline-none border-light-gray bg-white-primary"
                                            placeholder="Cari nama produk..."
                                            value={search}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center p-3 border border-l-0 rounded-md rounded-l-none border-light-gray bg-white-primary"
                                        >
                                            {loading ? (
                                                <IconLoader3
                                                    size={20}
                                                    className="text-dark-primary animate-spin"
                                                    stroke={2}
                                                />
                                            ) : (
                                                <IconSearch size={20} className="text-dark-primary" stroke={2} />
                                            )}
                                        </button>
                                    </form>
                                </div>
                                <div className="flex items-center justify-center w-full gap-6">
                                    <button
                                        type="button"
                                        className="px-4 py-3 transition-all duration-300 ease-in-out bg-white border rounded-lg shadow border-light-gray hover:scale-95 hover:shadow-sm"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-sm font-medium text-dark-primary">Termurah</span>
                                            <IconAdjustmentsDollar
                                                size={18}
                                                stroke={1.7}
                                                className="text-dark-primary"
                                            />
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-3 transition-all duration-300 ease-in-out bg-white border rounded-lg shadow border-light-gray hover:scale-95 hover:shadow-sm"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-sm font-medium text-dark-primary">Favorit</span>
                                            <IconThumbUp size={18} stroke={2} className="text-dark-primary" />
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-3 transition-all duration-300 ease-in-out bg-white border rounded-lg shadow border-light-gray hover:scale-95 hover:shadow-sm"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-sm font-medium text-dark-primary">Best Saller</span>
                                            <IconFlame size={18} stroke={2} className="text-dark-primary" />
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className="px-4 py-3 transition-all duration-300 ease-in-out bg-white border rounded-lg shadow border-light-gray hover:scale-95 hover:shadow-sm"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <IconRefresh size={18} stroke={2} className="text-dark-primary" />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 py-5 gap-7">
                                {products &&
                                    products.map((product, index) => (
                                        <ServicesCard
                                            key={index}
                                            image={
                                                product.cover
                                                    ? `${PUBLIC}/cover/${product.cover}`
                                                    : '/assets/products/404.png'
                                            }
                                            link={`/produk/${product.slug}`}
                                            title={product.name}
                                            description={product.description}
                                        />
                                    ))}
                            </div>
                            <DefaultPagination />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    const response = await fetch(`${BACKEND}/products`);
    const result = await response.json();

    const data: Product[] = result.data;

    return {
        props: {
            data,
        },
        revalidate: 1 * 60 * 60,
    };
}
