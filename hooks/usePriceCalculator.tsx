import { useCallback } from 'react';
import { Product, ProgressivePricing } from '../libs/type';

const getApplicableProgressivePrice = (qty: number, progressivePricings: ProgressivePricing[]): number | null => {
    if (!progressivePricings || progressivePricings.length === 0) {
        return null;
    }

    const sortedPricings = [...progressivePricings].sort((a, b) => a.minQty - b.minQty);
    let applicablePricing: ProgressivePricing | null = null;

    for (const pricing of sortedPricings) {
        if (qty >= pricing.minQty) {
            applicablePricing = pricing;
        } else {
            break;
        }
    }

    return applicablePricing ? Number(applicablePricing.price) : null;
};

export const usePriceCalculator = (
    productComponent: Product['product_component'],
    selectedQualities: { id: number; value: string | number }[],
    selectedSize: { component: number | string; qualities: number | string; value: string | number }[],
) => {
    const getComponentPriceAndCogs = useCallback(
        (index: number, qty: number) => {
            const component = productComponent[index];
            const selectedQuality = selectedQualities[index]?.value || 0;
            const selectedSizeValue = selectedSize.find(
                (item) => item.component === component.component.name && item.qualities === selectedQuality,
            )?.value;

            let price = 0;
            let cogs = 0;

            if (selectedQuality && selectedSizeValue) {
                const quality = component.component.qualities.find((q) => q.name === selectedQuality);
                if (quality) {
                    const size = quality.qualitiesSize.find((s) => s.sizes.name === selectedSizeValue);
                    if (size) {
                        const sizeProgressivePrice = getApplicableProgressivePrice(qty, size.progressivePricing);
                        price = sizeProgressivePrice !== null ? sizeProgressivePrice : Number(size.price);
                        cogs = Number(size.cogs);
                    }
                }
            } else if (selectedQuality) {
                const quality = component.component.qualities.find((q) => q.name === selectedQuality);
                if (quality) {
                    const qualityProgressivePrice = getApplicableProgressivePrice(qty, quality.progressivePricing);
                    price = qualityProgressivePrice !== null ? qualityProgressivePrice : Number(quality.price);
                    cogs = Number(quality.cogs);
                }
            } else {
                const componentProgressivePrice = getApplicableProgressivePrice(
                    qty,
                    component.component.progressivePricing,
                );
                price =
                    componentProgressivePrice !== null ? componentProgressivePrice : Number(component.component.price);
                cogs = Number(component.component.cogs);
            }

            return { price, cogs };
        },
        [productComponent, selectedQualities, selectedSize],
    );

    const calculateTotal = useCallback(
        (qty: { id: number; value: number }[]) => {
            let totalPrice = 0;
            let totalCogs = 0;

            productComponent.forEach((_, index) => {
                const quantity = qty[index]?.value || 0;
                const { price, cogs } = getComponentPriceAndCogs(index, quantity);
                totalPrice += price * quantity;
                totalCogs += cogs * quantity;
            });

            return { totalPrice, totalCogs };
        },
        [productComponent, getComponentPriceAndCogs],
    );

    return { getComponentPriceAndCogs, calculateTotal };
};
