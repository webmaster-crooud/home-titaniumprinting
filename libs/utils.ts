import moment from 'moment-timezone';

export const BACKEND = process.env.NEXT_PUBLIC_API;
export const PUBLIC = process.env.NEXT_PUBLIC_STATIC;
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
