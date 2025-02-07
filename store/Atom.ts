import { atom } from 'jotai';
import { Cart } from '../libs/type';
export interface Account {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
}
export const alertShow = atom<{ type: string; message: string } | undefined>(undefined);
export const authAccount = atom<Account>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
});
export const cartAtom = atom<Cart>({
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
