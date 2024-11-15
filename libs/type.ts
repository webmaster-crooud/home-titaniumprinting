export interface Data {
    categories: Categories[];
    product?: Product;
}

export interface Categories {
    name: string;
    slug: string;
    flag: string;
    description: string;
}

export interface NavBreadcrumbData {
    title: string;
    url?: string;
}

export interface Product {
    barcode: string;
    name: string;
    slug: string;
    flag: string;
    cover: string;
    description: string;
    totalPrice: number | string;
    totalCogs: number | string;
    product_category: {
        categories: {
            name: string;
            slug: string;
            description: string;
        };
    }[];
    service_product: {
        services: {
            name: string;
            slug: string;
            category_service: {
                categories: {
                    name: string;
                };
            }[];
        };
    }[];
    images: {
        name: string;
        source: string;
    }[];
    product_component: {
        minQty: number;
        typePieces: string;
        component: {
            id: number | string;
            name: string;
            canIncrise: boolean;
            price: string | number;
            description: string;
            typeComponent: string;
            qualities: {
                name: string;
                description: string;
                orientation: boolean;
                id: number | string;
                sizes: {
                    id: number;
                    cogs: number;
                    height: number;
                    length: number;
                    price: number;
                    weight: number;
                    width: number;
                }[];
            }[];
        };
    }[];
}

export type ProductComponent = Product['product_component'];

interface User {
    firstName: string;
    lastName: string;
    phone: string | number;
    email: string;
    address: Address;
    delivery: {
        courier: string;
        price: string | number;
        resi?: string;
    };
}

interface Address {
    name: string;
    street: string;
    city: string;
    province: string;
    country?: string;
    postalCode: string;
    building: string;
}

export interface Cart {
    user?: User;
    account?: {
        username: string;
        addressId: number | string | null;
    };
    files?: File | null;
    notes?: string;
    totalPriceComponent?: number | string;
    totalWeightComponent?: number | string;
    totalPrice?: number | string;
    subTotal?: number | string;
    totalCogs?: number | string;
    totalQty?: number;
    productDetail?: {
        barcode: string | undefined;
        productComponent?: ValueComponent[];
    };
}

export interface ValueComponent {
    componentId: string;
    qualityId: string | number | null;
    sizeId: string | number | null;
    qty: number;
    totalPriceComponent: number | string | null;
}
