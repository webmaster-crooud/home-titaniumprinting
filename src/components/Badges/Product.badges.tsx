import React from 'react';
import { Product } from '../../../libs/type';
import Link from 'next/link';

type propsProductBadges = {
    product?: Product;
};

export const ProductCategoriesBadges: React.FC<propsProductBadges> = ({ product }) => {
    return (
        product?.product_category && (
            <div className="flex flex-wrap items-center justify-start gap-3">
                {product?.product_category.map(({ categories }, index) => (
                    <Link
                        href={`/kategori/${categories.slug}`}
                        className="px-2 py-1 text-xs font-medium rounded-full text-dark-primary bg-warning"
                        key={index}
                    >
                        {categories.name}
                    </Link>
                ))}
            </div>
        )
    );
};

export const ProductServicesBadges: React.FC<propsProductBadges> = ({ product }) => {
    return (
        product?.service_product && (
            <div className="grid grid-cols-3 gap-3 mt-3">
                {product.service_product.map(({ services }, index) => (
                    <Link
                        href={`/kategori/${services.slug}`}
                        className="text-xs font-medium rounded-full text-blue"
                        key={index}
                    >
                        #{services.name}
                    </Link>
                ))}
            </div>
        )
    );
};
