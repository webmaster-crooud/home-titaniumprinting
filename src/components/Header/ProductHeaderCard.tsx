import Image from 'next/image';
import { Product } from '../../../libs/type';
import { PUBLIC } from '../../../libs/utils';
import { ProductCategoriesBadges, ProductServicesBadges } from '../Badges/Product.badges';
import { IconMoodSmile, IconSparkles, IconThumbUp } from '@tabler/icons-react';

type propsProductHeaderCard = {
    product?: Product;
};
export const ProductHeaderCard: React.FC<propsProductHeaderCard> = ({ product }) => {
    return (
        <div className="grid grid-cols-3 gap-6 pb-12 border-b border-light-gray">
            <Image
                src={`${PUBLIC}/cover/${product?.cover}`}
                alt={`${product?.name} Cover By Titanium Printing`}
                width={300}
                height={300}
                style={{
                    height: '100%',
                    width: '100%',
                    objectPosition: 'center',
                    objectFit: 'cover',
                }}
                priority
                className="rounded-lg shadow-md"
            />
            <div className="col-span-2">
                <ProductCategoriesBadges product={product ? product : undefined} />

                <h1 className="font-medium text-[32px] leading-9 my-7">{product?.name}</h1>
                <p className="text-base font-base text-gray">{product?.description}</p>
                <ProductServicesBadges product={product ? product : undefined} />

                <div className="flex items-center justify-start gap-5 mt-7">
                    <div className="flex items-center justify-start gap-1">
                        <IconThumbUp size={20} stroke={1.7} />
                        <span className="text-base font-normal text-dark-primary">Garansi</span>
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <IconMoodSmile size={20} stroke={1.7} />
                        <span className="text-base font-normal text-dark-primary">Costumizeable</span>
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <IconSparkles size={20} stroke={1.7} />
                        <span className="text-base font-normal text-dark-primary">High Quality</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
