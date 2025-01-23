export interface Data {
    categories?: Categories[];
    product?: Product;
    favCategories?: Categories[];
    services?: Services[];
}

export interface Services {
    [x: string]: any;
    slug: string;
    name: string;
    products?: Product[];
    flag: string;
}
export interface Categories {
    [x: string]: any;
    name: string;
    slug: string;
    flag: string;
    description: string;
    products?: Product[];
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
        };
    }[];
    // images: {
    //     name: string;
    //     source: string;
    // }[];
    product_component: {
        minQty: number;
        component: {
            id: number | string;
            name: string;
            price?: string | number;
            cogs?: string | number;
            typeComponent: string;
            qualities: {
                name: string;
                id: number | string;
                price?: number;
                cogs?: string | number;
                qualitiesSize: {
                    sizeId: number;
                    price: string | number;
                    cogs?: string | number;
                    sizes: {
                        id: number;
                        cogs: number;
                        height: number;
                        length: number;
                        price: number;
                        weight: number;
                        width: number;
                        name: string;
                    };
                }[];
            }[];
        };
    }[];
}

export type ProductComponent = Product['product_component'];

export interface Customer {
    firstName: string;
    lastName: string;
    phone: string | number;
    email: string;
    address: Address;
}

export interface Address {
    name?: string;
    street: string;
    city: string;
    cityId: string;
    province: string;
    country?: string;
    postalCode: string;
    building?: string;
}

export interface User {
    email: string;
    addressId?: string | number;
}
export interface DiscountData {
    code: string;
    price?: string | number;
    percent?: string | number;
}
export interface Cart {
    id?: string;
    email?: string;
    productId: string;
    product: {
        name: string;
        barcode: string;
        slug?: string;
        cover?: string;
        description?: string;
    };
    delivery: {
        from: string;
        destination: string;
        weight: string | number;
        resi?: string;
        courier: string;
        code?: string;
        etd?: string;
        service?: string;
        price: number | string;
    };
    notes: string;
    copies: number; // Tambahkan copies
    files: File[];
    totalCogs?: number;
    subTotalPrice: number;

    promotionCode: string;
    finalTotalPrice: number;
    discount?: DiscountData;
    status: string;
    totalWeight: string | number;
    productComponent: {
        componentId: string;
        componentName: string;
        qualityId: string | number | null;
        sizeId: string | number | null;
        cogs: number;
        qty: number;
        price: number;
        totalPriceComponent: number;
        totalCogsComponent: number;
        weight: string | number;
    }[];
    user: User;
    customer: Customer;
}

export interface ValueComponent {
    componentId: string;
    qualityId: string | number | null;
    sizeId: string | number | null;
    qty: number;
    totalPriceComponent: number | string | null;
}
