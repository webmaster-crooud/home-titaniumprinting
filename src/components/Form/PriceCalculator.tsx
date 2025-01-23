import { useCallback } from 'react';
import { Product } from '../../../libs/type';

export const usePriceCalculator = (
    productComponent: Product['product_component'],
    selectedQualities: { id: number; value: string | number }[],
    selectedSize: { component: number | string; qualities: number | string; value: string | number }[],
    qty: { id: number; value: number }[],
) => {
    // Fungsi untuk menghitung COGS dan Price per komponen
    const getComponentPriceAndCogs = useCallback(
        (index: number) => {
            const component = productComponent[index];

            // Pastikan selectedQualities[index] ada sebelum mengakses .value
            const selectedQuality = selectedQualities[index]?.value || 0;

            // Cari selectedSize yang sesuai
            const selectedSizeValue = selectedSize.find(
                (item) => item.component === component.component.name && item.qualities === selectedQuality,
            )?.value;

            let price = 0;
            let cogs = 0;

            if (selectedQuality && selectedSizeValue) {
                // Gunakan price dan cogs dari size
                const quality = component.component.qualities.find((q) => q.name === selectedQuality);
                if (quality) {
                    const size = quality.qualitiesSize.find((s) => s.sizes.name === selectedSizeValue);
                    if (size) {
                        price = Number(size.price);
                        cogs = Number(size.cogs);
                    }
                }
            } else if (selectedQuality) {
                // Gunakan price dan cogs dari qualities
                const quality = component.component.qualities.find((q) => q.name === selectedQuality);
                if (quality) {
                    price = Number(quality.price);
                    cogs = Number(quality.cogs);
                }
            } else {
                // Gunakan price dan cogs dari component
                price = Number(component.component.price);
                cogs = Number(component.component.cogs);
            }

            return { price, cogs };
        },
        [productComponent, selectedQualities, selectedSize],
    );

    // Fungsi untuk menghitung total harga dan COGS
    const calculateTotal = useCallback(() => {
        let totalPrice = 0;
        let totalCogs = 0;

        productComponent.forEach((component, index) => {
            const quantity = qty[index]?.value || 0;
            const { price, cogs } = getComponentPriceAndCogs(index);
            totalPrice += price * quantity;
            totalCogs += cogs * quantity;
        });

        return { totalPrice, totalCogs };
    }, [productComponent, qty, getComponentPriceAndCogs]);

    return { getComponentPriceAndCogs, calculateTotal };
};
