import { Product, ValueComponent } from './type';
export function mapCartToProductDetails(
    cart: ValueComponent[],
    product: Product,
): (ValueComponent & {
    componentName: string;
    qualityName: string;
    sizePrice: number | null;
    componentPrice: number | null | string;
})[] {
    return cart.map((cartItem) => {
        // Cari komponen yang sesuai berdasarkan componentId
        const productComponent = product.product_component.find(
            (comp) => String(comp.component.id) === cartItem.componentId,
        );

        if (!productComponent)
            return { ...cartItem, componentName: '', qualityName: '', sizePrice: null, componentPrice: null };

        const { component } = productComponent;

        // Cari kualitas yang sesuai berdasarkan qualityId
        const quality = component.qualities.find((q) => Number(q.id) === Number(cartItem.qualityId)) || null;

        // Cari ukuran yang sesuai berdasarkan sizeId
        const size = quality?.sizes.find((s) => Number(s.id) === Number(cartItem.sizeId)) || null;

        return {
            ...cartItem,
            componentName: component.name,
            componentPrice: component?.price || null,
            qualityName: quality?.name || '',
            sizePrice: size?.price || null,
            totalPriceComponent: (size?.price || 0) * cartItem.qty,
        };
    });
}
