import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Cart, Product } from '../../../libs/type';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import { IconCloudUpload, IconHelpCircle, IconX } from '@tabler/icons-react';
import { formatCurrency } from '../../../libs/utils';
import Link from 'next/link';

type propsProductForm = {
    product?: Product;
    cart?: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    barcode: string;
};

interface ValueComponent {
    componentId: string;
    qualityId: string | number | null;
    sizeId: string | number | null;
    qty: number;
    totalPriceComponent: number;
    totalWeightComponent: number;
}

export const _ProductForm: React.FC<propsProductForm> = ({ product, cart, setCart, barcode }) => {
    const [valueComponent, setValueComponent] = useState<ValueComponent[]>(
        product?.product_component.map((productComponent) => {
            const price = productComponent.component.price;
            const qty = productComponent.minQty;

            // Menghitung totalPriceComponent berdasarkan harga dan qty
            const totalPriceComponent = price ? Number(price) * qty : 0;
            const totalWeightComponent = 0;
            return {
                componentId: String(productComponent.component.id),
                qualityId: null,
                sizeId: null,
                qty: qty,
                totalPriceComponent: totalPriceComponent,
                totalWeightComponent: totalWeightComponent,
            };
        }) || [],
    );
    const [notes, setNotes] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const [totalQty, setTotalQty] = useState<number>(1);

    const handleChangeQty = useCallback(
        (index: number, qty: number) => {
            setValueComponent((prevValueComponent) =>
                prevValueComponent.map((item, idx) => {
                    if (idx === index) {
                        const componentData = product?.product_component.find(
                            (pc) => pc.component.id === item.componentId,
                        );
                        const quality = componentData?.component.qualities.find((q) => q.id === item.qualityId);
                        const size = quality?.sizes.find((s) => s.id === item.sizeId);
                        let componentPrice = 0;
                        if (size?.price) {
                            componentPrice =
                                Number(componentData?.component.price ? componentData.component.price : size.price) *
                                qty;
                        }
                        let componentWeigth = 0;
                        if (size?.weight) {
                            componentWeigth = Number(size.weight) * qty;
                        }
                        return {
                            ...item,
                            qty,
                            totalPriceComponent: componentPrice,
                            totalWeightComponent: componentWeigth,
                        };
                    }
                    return item;
                }),
            );
        },
        [product],
    );

    const handleChangeQuality = useCallback((componentIndex: number, qualityId: number | null) => {
        setValueComponent((prevComponents) =>
            prevComponents.map((component, index) =>
                index === componentIndex
                    ? { ...component, qualityId, sizeId: null, totalPriceComponent: 0, totalWeightComponent: 0 }
                    : component,
            ),
        );
    }, []);

    const handleChangeSize = useCallback(
        (componentIndex: number, sizeId: number | null, price: number) => {
            setValueComponent((prevComponents) =>
                prevComponents.map((component, index) => {
                    if (index === componentIndex) {
                        const componentData = product?.product_component.find(
                            (pc) => pc.component.id === component.componentId,
                        );
                        const quality = componentData?.component.qualities.find((q) => q.id === component.qualityId);
                        const size = quality?.sizes.find((s) => s.id === sizeId);
                        let componentPrice = 0;
                        if (size?.price) {
                            componentPrice =
                                Number(componentData?.component.price ? componentData.component.price : size.price) *
                                component.qty;
                        }
                        let componentWeigth = 0;
                        if (size?.weight) {
                            componentWeigth = Number(size.weight) * component.qty;
                        }
                        return {
                            ...component,
                            sizeId,
                            totalPriceComponent: componentPrice,
                            totalWeightComponent: componentWeigth,
                        };
                    }
                    return component;
                }),
            );
        },
        [product],
    );
    const calculateTotalPrice = useCallback((): number => {
        return valueComponent.reduce((total, comp) => total + comp.totalPriceComponent, 0);
    }, [valueComponent]);

    const calculateTotalWeight = useCallback((): number => {
        return valueComponent.reduce((total, comp) => total + comp.totalWeightComponent, 0);
    }, [valueComponent]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileError('');

        if (file) {
            // Validasi tipe file
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setFileError('Format file harus PDF, PNG, atau JPG');
                event.target.value = ''; // Reset input file
                return;
            }

            // Validasi ukuran file (maksimal 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB dalam bytes
            if (file.size > maxSize) {
                setFileError('Ukuran file maksimal 5MB');
                event.target.value = ''; // Reset input file
                return;
            }

            setSelectedFile(file);
        }
    };
    // Handler untuk menghapus file
    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    let cartRef = useRef(cart);
    cartRef.current = cart;
    useEffect(() => {
        setCart({
            ...cartRef.current,
            totalPriceComponent: calculateTotalPrice(),
            totalWeightComponent: calculateTotalWeight() * totalQty,
            notes: notes,
            files: selectedFile,
            productDetail: {
                barcode: barcode,
                productComponent: valueComponent,
            },
            totalQty: totalQty,
            subTotal: Number(calculateTotalPrice() * totalQty),
        });
    }, [barcode, calculateTotalPrice, setCart, valueComponent, notes, selectedFile, calculateTotalWeight, totalQty]);

    return (
        <div className="pt-6">
            {product?.product_component.map((productComponent, componentIndex) => (
                <div key={componentIndex} className="p-5 mt-5 border rounded-lg bg-white-primary border-light-gray">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium ">
                            {productComponent.component.typeComponent}: {productComponent.component.name}
                        </h3>
                        {productComponent.component.description && (
                            <Tooltip
                                title={productComponent.component.description}
                                position="bottom"
                                arrow
                                className="cursor-pointer"
                                size="small"
                            >
                                <IconHelpCircle stroke={1.7} className="text-blue" />
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex items-center justify-end mt-3">
                        <div className="flex flex-col justify-end w-full gap-y-2">
                            {productComponent.component.price && (
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Harga</p>
                                    <p className="text-sm font-normal">
                                        {formatCurrency.format(Number(productComponent.component.price))}
                                    </p>
                                </div>
                            )}
                        </div>
                        {productComponent.component.typeComponent !== 'PROCESSING' && (
                            <div className="w-full">
                                <p className="flex items-center justify-end gap-1 text-sm text-danger">
                                    <span>Jumlah Min. Kuantitas</span>
                                    <span>{productComponent.minQty}</span>
                                </p>
                                <div className="flex items-center w-5/12 overflow-hidden border rounded-md shadow ms-auto border-light-gray">
                                    <input
                                        name="minQty"
                                        type="text"
                                        className="w-4/12 py-3 text-sm text-center outline-none bg-white-primary"
                                        autoComplete="off"
                                        placeholder="0"
                                        value={valueComponent[componentIndex]?.qty.toString()}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleChangeQty(componentIndex, Number(e.target.value))
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-3">
                        {productComponent.component.typeComponent !== 'PROCESSING' && (
                            <div className="flex items-center justify-between">
                                <h5 className="w-full text-sm font-medium text-dark-primary">
                                    Pilih Jenis Kualitas {productComponent.component.typeComponent}
                                </h5>
                            </div>
                        )}

                        <div className="flex flex-col mt-3 gap-y-2">
                            {productComponent.component.qualities.map((quality, qualityIndex) => (
                                <React.Fragment key={qualityIndex}>
                                    <button
                                        type="button"
                                        className={`w-8/12 px-2 py-4 text-sm font-light border rounded-lg ${
                                            valueComponent[componentIndex]?.qualityId === quality.id
                                                ? 'bg-blue-50 border-blue-200'
                                                : 'bg-white border-light-gray'
                                        }`}
                                        onClick={() => handleChangeQuality(componentIndex, Number(quality.id))}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-start gap-2">
                                                <input
                                                    type="radio"
                                                    name={`quality-${componentIndex}`}
                                                    checked={valueComponent[componentIndex]?.qualityId === quality.id}
                                                    onChange={() => {}}
                                                />
                                                <h6>{quality.name}</h6>
                                            </div>
                                        </div>
                                    </button>

                                    {valueComponent[componentIndex]?.qualityId === quality.id && (
                                        <div className="flex flex-col gap-y-2">
                                            {quality.sizes.map((size, sizeIndex) => (
                                                <button
                                                    type="button"
                                                    className={`w-8/12 p-3 text-xs font-light border rounded-md ${
                                                        valueComponent[componentIndex]?.sizeId === size.id
                                                            ? 'bg-blue-50 border-blue-200'
                                                            : 'bg-white-primary border-light-gray'
                                                    }`}
                                                    key={sizeIndex}
                                                    onClick={() =>
                                                        handleChangeSize(componentIndex, size.id, size.price)
                                                    }
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center justify-start gap-2">
                                                            <input
                                                                type="radio"
                                                                name={`size-${componentIndex}-${qualityIndex}`}
                                                                checked={
                                                                    valueComponent[componentIndex]?.sizeId === size.id
                                                                }
                                                                onChange={() => {}}
                                                            />
                                                            <p className="font-medium text-dark-primary">
                                                                {formatCurrency.format(size.price ? size.price : 0)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-3">
                                                            {size.length ? <p>P {size.length} cm</p> : null}
                                                            {size.width ? <p>L {size.width} cm</p> : null}
                                                            {size.height ? <p>T {size.height} cm</p> : null}
                                                            {size.weight ? <p>Berat {size.weight * 1000} g</p> : null}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}

                                            <div className="mt-3 font-medium text-dark-primary">
                                                <div className="flex items-center justify-start gap-2">
                                                    <b>Total Harga:</b>
                                                    <span>
                                                        {formatCurrency.format(
                                                            valueComponent[componentIndex].totalPriceComponent,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-between mt-5">
                <div className="w-full">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">
                        File Cetak
                    </label>
                    <small className="text-xs font-light text-gray">
                        File berformat PDF, PNG, JPG dengan resolusi terbaik.{' '}
                        <Link href={'/'}> Baca Instruksi File</Link>
                    </small>
                </div>
                <div className="relative w-5/12 cursor-pointer">
                    {selectedFile ? (
                        <div className="flex items-center justify-between px-3 py-2 text-sm border rounded-md border-light-gray">
                            <div className="flex items-center gap-2">
                                <IconCloudUpload size={18} stroke={2} />
                                <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                            </div>
                            <button onClick={handleRemoveFile} className="p-1 rounded-full hover:bg-gray-100">
                                <IconX size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="px-3 py-2 text-sm border rounded-md cursor-pointer border-light-gray">
                                <div className="flex items-center justify-center w-full gap-1">
                                    <IconCloudUpload size={18} stroke={2} />
                                    <span className="text-sm font-medium">Upload (PDF, PNG)</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileUpload}
                                className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer z-[1]"
                            />
                        </>
                    )}
                    {/* <div className="px-3 py-2 text-sm border rounded-md border-light-gray">
                        <div className="flex items-center justify-center w-full gap-1">
                            <IconCloudUpload size={18} stroke={2} />
                            <span className="text-sm font-medium">Upload (PDF, PNG)</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer z-[1]"
                    /> */}
                </div>
            </div>
            {fileError && <p className="mt-1 text-xs text-red-500">{fileError}</p>}
            <div className="flex items-start justify-between gap-5 mt-5">
                <div className="w-2/12">
                    <label htmlFor="noteForm" className="block mb-2 text-sm font-medium">
                        Jumlah Copy
                    </label>
                    <input
                        type="number"
                        className="w-full h-full p-5 text-sm border rounded-lg bg-white-primary outline-dark-primary border-light-gray"
                        value={totalQty}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTotalQty(Number(e.target.value));
                        }}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="noteForm" className="block mb-2 text-sm font-medium">
                        Catatan
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Tulis Catatan Yang penting untuk Titanium Printing"
                        className="w-full p-5 text-sm border rounded-lg bg-white-primary outline-dark-primary border-light-gray"
                        value={notes}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setNotes(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="p-6 border rounded-lg border-light-gray bg-gradient-to-r from-white via-[#F4F7FF] to-[#D9DDFF] mt-5">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="mb-2 text-lg font-medium">Kebutuhan anda tidak tersedia?</h3>
                        <p className="text-sm font-light text-gray">Silahkan hubungi kami untuk custom produk</p>
                    </div>

                    <Link
                        href={'/'}
                        className="px-5 py-3 text-base font-medium bg-white border rounded-lg border-light-gray"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </div>
    );
};
