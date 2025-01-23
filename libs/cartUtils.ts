import { Cart } from './type';

export function mapCartToProductDetails(cart: Cart['productComponent']) {
    return cart.map((cartItem) => {
        // Ambil data yang diperlukan
        const componentName = cartItem.componentName;
        const qualityName = cartItem.qualityId ? `Kualitas: ${cartItem.qualityId}` : '';
        const sizeName = cartItem.sizeId ? `Size: ${cartItem.sizeId}` : '';
        const price = Number(cartItem.price) || 0; // Harga per item
        const qty = Number(cartItem.qty) || 0; // Jumlah kuantitas
        const totalPrice = Number(cartItem.totalPriceComponent) || 0; // Total harga (price * qty)

        return {
            componentName, // Nama produk
            qualityName, // Kualitas (jika ada)
            sizeName, // Size (jika ada)
            price, // Harga per item
            qty, // Jumlah kuantitas
            totalPrice, // Total harga (price * qty)
        };
    });
}
