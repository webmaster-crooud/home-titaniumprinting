import moment from 'moment-timezone';

export const BACKEND = process.env.NEXT_PUBLIC_API;
export const PUBLIC = process.env.NEXT_PUBLIC_STATIC;
export const AUTH = process.env.NEXT_PUBLIC_AUTH;
export const PANEL = process.env.NEXT_PUBLIC_PANEL;

import { Inter } from 'next/font/google';
import { ProgressivePricing } from './type';

export const inter = Inter({
    display: 'swap',
    subsets: ['latin'],
});

export const formatCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
});

export const formatDateTIme = (dateTime: Date) => {
    const result = moment.parseZone(dateTime);
    return moment(result).utcOffset('Asia/Jakarta').format('DD, MMMM YYYY - HH:mm');
};
export const formatDeliveryTime = (dateTime: Date) => {
    const result = moment.parseZone(dateTime);
    return moment(result).utcOffset('Asia/Jakarta').format('DDMMYYYYHHmm');
};

export const getProgressivePrice = (qty: number, progressivePricing: ProgressivePricing[]) => {
    if (!progressivePricing || progressivePricing.length === 0) return null;

    // Urutkan progressivePricing berdasarkan minQty secara ascending
    const sortedPricing = progressivePricing.sort((a, b) => a.minQty - b.minQty);

    // Cari harga yang sesuai dengan qty
    let selectedPrice = sortedPricing[0].price;
    for (const pricing of sortedPricing) {
        if (qty >= pricing.minQty && qty <= pricing.maxQty) {
            selectedPrice = pricing.price;
            break;
        } else if (qty > pricing.maxQty) {
            selectedPrice = pricing.price;
        }
    }

    return selectedPrice;
};
