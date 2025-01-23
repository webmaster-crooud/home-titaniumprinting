import React, { useState } from 'react';
import { Product } from '../../../libs/type';
import {
    IconChevronDown,
    IconCircle,
    IconCircleFilled,
    IconMinus,
    IconPlus,
    IconQuestionMark,
} from '@tabler/icons-react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { useAtom } from 'jotai';
import { formatCurrency } from '../../../libs/utils';
import { usePriceCalculator } from './PriceCalculator';
import { cartAtom } from '../../../store/Atom';

type PropsProductForm = {
    productComponent: Product['product_component'];
};

export const ProductForm: React.FC<PropsProductForm> = ({ productComponent }) => {
    const [cart, setCart] = useAtom(cartAtom);
    console.log(cart); // Debugging

    const [qty, setQty] = useState(
        productComponent.map((pc, index) => ({
            id: index,
            productBarcode: cart.product.barcode,
            value: pc.minQty,
        })),
    );

    const [selectedQualities, setSelectedQualities] = useState<{ id: number; value: string | number }[]>(
        productComponent.map((_, index) => ({ id: index, value: 0 })),
    );

    const [selectedSize, setSelectedSize] = useState<
        { component: number | string; qualities: number | string; value: string | number }[]
    >([]);

    const { getComponentPriceAndCogs } = usePriceCalculator(productComponent, selectedQualities, selectedSize, qty);

    // Handle quantity increase
    const handlePlus = (index: number) => {
        setQty((prevQty) => {
            const newQty = prevQty.map((item, i) => {
                if (i === index) {
                    return { ...item, value: item.value + 1 };
                }
                return item;
            });
            updateCartQty(newQty, index);
            return newQty;
        });
    };

    // Handle quantity decrease
    const handleMinus = (index: number) => {
        setQty((prevQty) => {
            const newQty = prevQty.map((item, i) => {
                if (i === index && item.value > productComponent[index].minQty) {
                    return { ...item, value: item.value - 1 };
                }
                return item;
            });
            updateCartQty(newQty, index);
            return newQty;
        });
    };

    // Handle manual quantity input
    const handleInputChange = (index: number, value: number) => {
        if (value < productComponent[index].minQty) {
            console.log('TIDAK BOLEH');
        } else {
            setQty((prevQty) => {
                const newQty = [...prevQty];
                newQty[index].value = isNaN(value) ? productComponent[index].minQty : value;
                updateCartQty(newQty, index);
                return newQty;
            });
        }
    };

    // Update cart quantity and total price
    const updateCartQty = (newQty: { id: number; value: number }[], index: number) => {
        setCart((prevCart) => {
            const newProductComponent = [...prevCart.productComponent];
            newProductComponent[index].qty = newQty[index].value;
            newProductComponent[index].totalPriceComponent = newProductComponent[index].price * newQty[index].value;
            newProductComponent[index].totalCogsComponent = newProductComponent[index].cogs * newQty[index].value;
            return { ...prevCart, productComponent: newProductComponent };
        });
    };

    // Handle quality selection
    const handleChangeSelectedQualities = (id: number, value: string | number) => {
        setSelectedQualities((prev) => {
            const newSelectedQualities = [...prev];
            if (newSelectedQualities[id].value === value) return newSelectedQualities;

            newSelectedQualities[id].value = value;
            resetSelectedSize(id);
            updateCartQuality(id, value);
            return newSelectedQualities;
        });
    };

    // Reset selected size when quality changes
    const resetSelectedSize = (id: number) => {
        setSelectedSize((prev) => prev.filter((item) => item.component !== productComponent[id].component.name));
    };

    // Update cart with selected quality
    const updateCartQuality = (id: number, value: string | number) => {
        setCart((prevCart) => {
            const newProductComponent = [...prevCart.productComponent];
            const component = productComponent[id];
            const quality = component.component.qualities.find((q) => q.name === value);
            const price = quality ? Number(quality.price) : Number(component.component.price);
            const cogs = quality ? Number(quality.cogs) : Number(component.component.cogs);

            newProductComponent[id] = {
                ...newProductComponent[id],
                qualityId: value,
                sizeId: null,
                price: price,
                cogs: price,
                weight: 0, // Reset weight saat kualitas diubah
                totalPriceComponent: price * newProductComponent[id].qty,
                totalCogsComponent: cogs * newProductComponent[id].qty,
            };
            return { ...prevCart, productComponent: newProductComponent };
        });
    };

    // Handle size selection
    const handleChangeSelectedSize = (
        component: number | string,
        qualities: number | string,
        value: number | string,
        price: number,
        cogs: number,
        weight: number, // Tambahkan weight sebagai parameter
    ) => {
        setSelectedSize((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.component === component && item.qualities === qualities,
            );
            if (existingIndex !== -1) {
                const newSelectedSize = [...prev];
                newSelectedSize[existingIndex].value = value;
                return newSelectedSize;
            } else {
                return [...prev, { component, qualities, value }];
            }
        });
        updateCartSize(component, value, price, cogs, weight); // Panggil updateCartSize dengan weight
    };

    // Update cart with selected size
    const updateCartSize = (
        component: number | string,
        value: number | string,
        price: number,
        cogs: number,
        weight: number,
    ) => {
        setCart((prevCart) => {
            const newProductComponent = [...prevCart.productComponent];
            const index = newProductComponent.findIndex((item) => item.componentName === component);
            if (index !== -1) {
                newProductComponent[index] = {
                    ...newProductComponent[index],
                    sizeId: value,
                    price: price,
                    cogs: cogs,
                    weight: weight, // Simpan weight ke productComponent
                    totalPriceComponent: price * newProductComponent[index].qty,
                    totalCogsComponent: cogs * newProductComponent[index].qty,
                };
            }
            return { ...prevCart, productComponent: newProductComponent };
        });
    };

    // Get default size value for select input
    const getDefaultSizeValue = (component: number | string, qualities: number | string) => {
        const selected = selectedSize.find((item) => item.component === component && item.qualities === qualities);
        return selected ? selected.value : 0;
    };

    console.log(cart); // Debugging

    return (
        <section className="pt-6">
            <h3 className="text-xl font-semibold text-dark-primary">Komponen Produk</h3>
            <div className="flex flex-col my-5 gap-y-5">
                {productComponent.map((pc, index) => {
                    const { price, cogs } = getComponentPriceAndCogs(index);
                    const totalComponentPrice = price + (qty[index] ? qty[index].value : 0);

                    return (
                        <div key={index}>
                            <div className="flex items-end justify-between">
                                <div className="flex items-center justify-start gap-2">
                                    <h5 className="font-semibold text-dark">{pc.component.name}</h5>
                                    <div className="flex items-center justify-center w-6 h-6 border-2 rounded-full border-light-gray">
                                        <Tooltip title={pc.component.typeComponent} size="small" arrow />
                                        <IconQuestionMark size={16} stroke={3} className="text-gray" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray">Jumlah Kuantitas</label>
                                    <div className="flex items-center justify-center overflow-hidden border rounded-lg bg-white-primary text-dark border-light-gray">
                                        <button
                                            type="button"
                                            onClick={() => handleMinus(index)}
                                            className="p-2 transition-all duration-200 ease-in-out hover:bg-danger text-dark hover:text-white"
                                        >
                                            <IconMinus size={20} stroke={2} />
                                        </button>
                                        <input
                                            type="text"
                                            className="px-3 py-2 text-sm font-semibold text-center w-14 bg-white-primary"
                                            value={qty[index] ? qty[index].value : 0}
                                            onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handlePlus(index)}
                                            className="p-2 transition-all duration-200 ease-in-out hover:bg-dark-primary text-dark hover:text-white"
                                        >
                                            <IconPlus size={20} stroke={2} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-sm">
                                <p className="text-gray">
                                    <span className="font-semibold">Price:</span> {formatCurrency.format(price)}
                                </p>
                                <p className="text-gray">
                                    <span className="font-semibold">Weight:</span>{' '}
                                    {cart.productComponent[index]?.weight || 0} G
                                </p>
                                <p className="text-gray">
                                    <span className="font-semibold">Weight:</span>{' '}
                                    {Number(cart.productComponent[index]?.weight) * 0.001 || 0} KG
                                </p>
                            </div>
                            {pc.component.qualities.length !== 0 && (
                                <div className="flex flex-col gap-3 mt-3 text-sm">
                                    {pc.component.qualities.map((qualities, qualityIdx) => (
                                        <div className="grid items-start grid-cols-2 gap-5" key={qualityIdx}>
                                            <button
                                                type="button"
                                                className="flex items-center justify-start gap-3 px-3 py-2 border rounded-lg cursor-pointer bg-white-primary border-light-gray"
                                                onClick={() => handleChangeSelectedQualities(index, qualities.name)}
                                            >
                                                {qualities.name === selectedQualities[index]?.value || 0 ? (
                                                    <IconCircleFilled className="text-blue" stroke={2} size={16} />
                                                ) : (
                                                    <IconCircle stroke={2} size={16} />
                                                )}
                                                <span>{qualities.name}</span>
                                            </button>

                                            {selectedQualities[index]?.value !== 0 &&
                                                selectedQualities[index]?.value === qualities.name && (
                                                    <div className="grid items-start grid-cols-2 gap-3">
                                                        {qualities.qualitiesSize.length > 0 && (
                                                            <div className="flex flex-col gap-3">
                                                                <div className="relative w-full">
                                                                    <select
                                                                        name="sizes"
                                                                        className="w-full px-3 py-2 pr-10 text-sm border rounded-lg outline-none appearance-none cursor-pointer bg-white-primary border-light-gray"
                                                                        value={getDefaultSizeValue(
                                                                            pc.component.name,
                                                                            qualities.name,
                                                                        )}
                                                                        onChange={(e) => {
                                                                            const selectedSize =
                                                                                qualities.qualitiesSize.find(
                                                                                    (size) =>
                                                                                        size.sizes.name ===
                                                                                        e.target.value,
                                                                                );
                                                                            if (selectedSize) {
                                                                                handleChangeSelectedSize(
                                                                                    pc.component.name,
                                                                                    qualities.name,
                                                                                    e.target.value,
                                                                                    Number(selectedSize.price),
                                                                                    Number(selectedSize.cogs),
                                                                                    Number(selectedSize.sizes.weight), // Tambahkan weight
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value={0} disabled>
                                                                            Pilih Ukuran
                                                                        </option>
                                                                        {qualities.qualitiesSize.map(
                                                                            (sizes, sizeIndex) => (
                                                                                <option
                                                                                    value={sizes.sizes.name}
                                                                                    key={sizeIndex}
                                                                                >
                                                                                    {sizes.sizes.name}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                        <IconChevronDown className="w-5 h-5 text-gray-500" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {/* <button
                                                            type="button"
                                                            className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-dark-primary"
                                                        >
                                                            Ukuran Khusus
                                                        </button> */}
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-end justify-end w-full gap-5 my-8">
                <div className="w-full">
                    <h5 className="font-semibold text-dark">
                        Total Harga: {formatCurrency.format(cart.subTotalPrice)}
                    </h5>
                    <h5 className="font-semibold text-dark">
                        Total Berat: {cart.delivery.weight}g [{Number(cart.delivery.weight) / 1000}Kg]
                    </h5>
                </div>
            </div>
            <div className="flex flex-col gap-5 my-8">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray">Jumlah Copies</label>
                    <div className="flex items-center justify-center overflow-hidden border rounded-lg bg-white-primary text-dark border-light-gray">
                        <button
                            type="button"
                            onClick={() => {
                                if (cart.copies > 1) {
                                    setCart((prevCart) => ({
                                        ...prevCart,
                                        copies: prevCart.copies - 1,
                                    }));
                                }
                            }}
                            className="p-2 transition-all duration-200 ease-in-out hover:bg-danger text-dark hover:text-white"
                        >
                            <IconMinus size={20} stroke={2} />
                        </button>
                        <input
                            type="text"
                            className="px-3 py-2 text-sm font-semibold text-center w-14 bg-white-primary"
                            value={cart.copies}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value >= 1) {
                                    setCart((prevCart) => ({
                                        ...prevCart,
                                        copies: value,
                                    }));
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setCart((prevCart) => ({
                                    ...prevCart,
                                    copies: prevCart.copies + 1,
                                }));
                            }}
                            className="p-2 transition-all duration-200 ease-in-out hover:bg-dark-primary text-dark hover:text-white"
                        >
                            <IconPlus size={20} stroke={2} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
