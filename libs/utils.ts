import moment from 'moment-timezone';

export const BACKEND = process.env.NEXT_PUBLIC_API;
export const PUBLIC = process.env.NEXT_PUBLIC_STATIC;
export const AUTH = process.env.NEXT_PUBLIC_AUTH;
export const PANEL = process.env.NEXT_PUBLIC_PANEL;

import { Inter } from 'next/font/google';

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
