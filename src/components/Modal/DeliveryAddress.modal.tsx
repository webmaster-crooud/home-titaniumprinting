import { useAtom } from 'jotai';
import { cartAtom } from '../../../store/Atom';
import React, { SetStateAction, useState, useEffect } from 'react'; // Tambahkan useEffect
import { DefaultCard } from '../Card';
import { IconCheck, IconLoader3, IconTruck, IconTruckDelivery, IconX } from '@tabler/icons-react';
import { BACKEND, formatCurrency } from '../../../libs/utils';

type propsDeliveryAddressModal = {
    modal?: {
        field: string;
    };
    setModal: React.Dispatch<SetStateAction<{ field: string } | undefined>>;
};

interface CostDelivery {
    code: string;
    name: string;
    costs: {
        service: string;
        description: string;
        cost: {
            value: string;
            etd: string;
            note: string;
        }[];
    }[];
}

interface DataCourier {
    value: string;
    name: string;
}

export const DeliveryAddressModal: React.FC<propsDeliveryAddressModal> = ({ modal, setModal }) => {
    const [cart, setCart] = useAtom(cartAtom);
    const [costDelivery, setCostDelivery] = useState<CostDelivery[]>([]);
    const [loading, setLoading] = useState<{ field: string } | undefined>(undefined);
    const [selectedCourier, setSelectedCourier] = useState<{
        courier: string;
        code?: string;
        etd?: string;
        service?: string;
        price: string | number;
    }>({ courier: '', code: '', etd: '', service: '', price: '' });

    const dataCourier: DataCourier[] = [
        {
            value: 'pos',
            name: 'POS Indonesia',
        },
        {
            value: 'tiki',
            name: 'TIKI',
        },
        {
            value: 'jne',
            name: 'JNE',
        },
    ];

    // Efek untuk mengatur overflow body saat modal terbuka
    useEffect(() => {
        if (modal?.field === 'delivery') {
            document.body.style.overflow = 'hidden'; // Nonaktifkan scrolling pada body
        } else {
            document.body.style.overflow = 'auto'; // Aktifkan kembali scrolling pada body
        }

        // Cleanup effect
        return () => {
            document.body.style.overflow = 'auto'; // Pastikan scrolling diaktifkan kembali saat komponen unmount
        };
    }, [modal]);

    const handleCheckDelivery = async (courier: string) => {
        setLoading({ field: 'checkDelivery' });
        try {
            const weight = Number(cart.delivery.weight);
            const destination = cart.customer.address.cityId;
            if (!weight || weight === 0) {
                console.error('Berat Barang Kurang');
            }
            if (!destination) {
                console.error('Tujuan anda belum ditentukan!');
            }
            const from = 444;
            const response = await fetch(`${BACKEND}/rajaongkir/delivery/${from}/${destination}/${weight}/${courier}`, {
                method: 'POST',
            });
            const { data }: { data: CostDelivery[] } = await response.json();
            setCostDelivery(
                data.map((delivery) => ({
                    code: delivery.code,
                    name: delivery.name,
                    costs: delivery.costs.map((cost) => ({
                        service: cost.service,
                        description: cost.description,
                        cost: cost.cost.map((c) => ({
                            value: c.value,
                            etd: c.etd,
                            note: c.note,
                        })),
                    })),
                })),
            );
            setCart({ ...cart, delivery: { ...cart.delivery, courier: courier } });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(undefined);
        }
    };

    const handleSelectedCourier = (etd: string, service: string, price: string | number) => {
        setSelectedCourier({
            ...selectedCourier,
            code: costDelivery[0].code,
            courier: costDelivery[0].name,
            service,
            price,
            etd,
        });
        setCart({
            ...cart,
            finalTotalPrice: Number(cart.subTotalPrice) + Number(price),
            delivery: {
                ...cart.delivery,
                from: '444',
                destination: cart.customer.address.cityId,
                etd,
                price: price,
                service: service,
            },
        });
        setModal(undefined);
    };

    console.log(cart);
    console.log(selectedCourier);
    console.log(costDelivery);
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    if (!cart.customer.address.cityId) {
                        console.error('Kota Masih Kosong');
                    } else {
                        setModal({ field: 'delivery' });
                    }
                }}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-dark-primary"
            >
                <div className="flex items-center justify-center gap-2">
                    <IconTruckDelivery size={16} stroke={2} /> <span>Pengiriman</span>
                </div>
            </button>
            {modal?.field === 'delivery' && (
                <section className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center w-full min-h-screen bg-dark/10 backdrop-blur-md">
                    <div className="relative w-11/12 max-h-[90vh] overflow-y-auto bg-white rounded-lg p-5">
                        <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-dark-primary">Pengiriman</h5>
                            <button type="button" onClick={() => setModal(undefined)}>
                                <IconX stroke={2.5} size={25} />
                            </button>
                        </div>
                        <div className="relative">
                            <select
                                disabled={loading?.field === 'checkDelivery'}
                                name="courier"
                                className="w-full px-4 py-2 my-5 text-sm border rounded-lg outline-none appearance-none bg-light-primary border-light-gray"
                                value={cart.delivery.courier || ''}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    handleCheckDelivery(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Pilih Kurir Pengiriman
                                </option>
                                {dataCourier.map((courier, index) => (
                                    <option value={courier.value} key={index}>
                                        {courier.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                {loading?.field === 'checkDelivery' ? (
                                    <IconLoader3 className={`animate-spin text-gray-500`} size={20} />
                                ) : (
                                    <div className="flex items-center justify-end gap-1">
                                        <h3 className="text-xs text-gray">{costDelivery[0]?.name}</h3>
                                        <IconTruck size={20} className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {costDelivery.length !== 0 && (
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                {costDelivery[0]?.costs.map((cost, idxCost) => (
                                    <button
                                        type="button"
                                        key={idxCost}
                                        className={`flex items-start bg-light-primary justify-between px-5 py-3 border rounded-lg  text-start relative ${
                                            selectedCourier.code === costDelivery[0].code &&
                                            selectedCourier.service === cost.service &&
                                            selectedCourier.price &&
                                            cost.cost[0].value &&
                                            selectedCourier.etd &&
                                            cost.cost[0].etd
                                                ? 'border-blue'
                                                : 'border-light-gray'
                                        }`}
                                        onClick={() =>
                                            handleSelectedCourier(cost.cost[0].etd, cost.service, cost.cost[0].value)
                                        }
                                    >
                                        {selectedCourier.code === costDelivery[0].code &&
                                        selectedCourier.service === cost.service &&
                                        selectedCourier.price &&
                                        cost.cost[0].value &&
                                        selectedCourier.etd &&
                                        cost.cost[0].etd ? (
                                            <div className="absolute flex items-center justify-center w-5 h-5 border-2 rounded-full -top-2 -right-2 border-blue bg-blue">
                                                <IconCheck className="text-light-primary" size={14} stroke={2.5} />
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold text-dark-primary">{cost.service}</p>
                                            <p className="text-xs text-gray">{cost.description}</p>
                                        </div>
                                        {cost.cost.map((c, idxC) => (
                                            <div key={idxC}>
                                                <p className="text-sm font-semibold text-blue">
                                                    {formatCurrency.format(Number(c.value))} (
                                                    {c.etd.replace('HARI', '')} Hari)
                                                </p>
                                            </div>
                                        ))}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};
