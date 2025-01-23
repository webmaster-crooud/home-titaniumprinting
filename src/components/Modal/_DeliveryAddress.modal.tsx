import { IconArrowBack, IconLoader3, IconLogin2, IconX } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BACKEND, formatCurrency, formatDateTIme } from '../../../libs/utils';
import { Cart, Product } from '../../../libs/type';
import Select from 'react-select';

interface Address {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}

interface Delivery {
    code: string;
    name: string;
    costs: {
        service: string;
        description: string;
        cost: {
            value: number | string;
            etd: string;
        }[];
    }[];
}

export const ModalDeliveryAddress = ({
    product,
    cart,
    setCart,
    modalDelivery,
    setModalDelivery,
}: {
    product?: Product;
    cart?: Cart;
    modalDelivery: boolean;
    setModalDelivery: any;
    setCart: any;
}) => {
    const [formAddress, setFormAddress] = useState(false);
    const [address, setAddress] = useState<Address[]>([]);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [building, setBuilding] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [city, setCity] = useState<{ value: string; label: string }>({ value: '', label: '' });
    const [province, setProvince] = useState<{ value: string; label: string }>({ value: '', label: '' });
    const [postalCode, setPostalCode] = useState<string>('');
    const [courier, setCourier] = useState<{ value: string; label: string }>({ value: '', label: '' });
    const [loading, setLoading] = useState(false);
    const [delivery, setDelivery] = useState<Delivery[] | undefined>(undefined);
    const [deliverSelected, setDeliverySelected] = useState<{ courier: string; price: number }>({
        courier: '',
        price: 0,
    });

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`${BACKEND}/rajaongkir/city`);
                const { data } = await response.json();
                setAddress(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAddress();
    }, []);

    const optionsCity = address.map((address) => ({
        value: address.city_id,
        label: `${address.type} ${address.city_name}`,
    }));
    const optionsProvince = address.map((address) => ({
        value: address.province_id,
        label: `${address.province}`,
    }));
    const optionsCourier = [
        { value: 'jne', label: 'JNE' },
        { value: 'pos', label: 'POS Indonesia' },
        { value: 'tiki', label: 'TIKI' },
    ];

    const handlerChangeCity = (values: any) => {
        setCity(values);
    };

    const handlerChangeProvince = (values: any) => {
        setProvince(values);
    };

    const handlerChangeCourier = (values: any) => {
        setCourier(values);
    };

    let weight = Number(cart?.totalWeightComponent);
    if (weight) {
        if (weight < 1) {
            weight = 1;
        } else {
            weight = Number(cart?.totalWeightComponent);
        }
    }
    const handlerCheckOngkir = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${BACKEND}/rajaongkir/delivery/444/${city.value}/${weight}/${courier.value}`,
                {
                    method: 'POST',
                },
            );

            const { data } = await response.json();
            setDelivery(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handlerSelectDelivery = (courier: string, price: number) => {
        setDeliverySelected({
            courier: courier,
            price: price,
        });
    };

    let cartRef = useRef(cart);
    cartRef.current = cart;
    let currentSubTotal = cart?.subTotal;
    const totalPrice = Number(currentSubTotal) + Number(deliverSelected.price);
    useEffect(() => {
        setCart({
            ...cartRef.current,
            totalPrice: Number(totalPrice),
            user: {
                firstName,
                lastName,
                phone,
                email,
                address: {
                    street,
                    city: city.label,
                    province: province.label,
                    name,
                    building,
                    postalCode,
                },
                delivery: {
                    courier: deliverSelected.courier,
                    price: Number(deliverSelected.price),
                },
            },
        });
    }, [
        building,
        firstName,
        lastName,
        phone,
        email,
        street,
        city,
        province,
        name,
        postalCode,
        setCart,
        cartRef,
        deliverSelected,
        totalPrice,
    ]);

    return (
        <>
            <button
                type="button"
                onClick={() => setModalDelivery(true)}
                className="w-full px-6 py-4 font-medium text-center text-white border rounded-md bg-dark-primary border-dark-primary"
            >
                Checkout
            </button>

            {/* Modal */}
            {modalDelivery && (
                <div className="fixed top-0 left-0 right-0 z-10 flex items-start justify-center w-full h-screen pt-10 overflow-y-scroll bg-dark/10 backdrop-blur-sm">
                    {formAddress ? (
                        <div className="w-6/12 px-10 py-5 mx-auto border shadow-lg rounded-xl border-light-gray bg-white-primary gap-y-3">
                            <div className="flex items-center justify-between">
                                <h5 className="text-lg font-medium text-dark-primary">Data Alamat Pengiriman</h5>
                                <button type="button" onClick={() => setModalDelivery(false)}>
                                    <IconX size={25} className="text-dark" />
                                </button>
                            </div>

                            <h1 className="text-sm font-medium text-gray">
                                Produk: <span className="font-normal">{product?.name}</span>
                            </h1>
                            <p className="text-sm font-medium text-gray">
                                Tanggal: <span className="font-normal">{formatDateTIme(new Date())}</span>
                            </p>
                            <p className="text-sm font-medium text-gray">
                                Berat: <span className="font-normal">{weight} Kg</span>
                            </p>

                            {delivery ? (
                                <div className="py-3 mt-5 border-t border-light-gray">
                                    <div className="flex items-center justify-between">
                                        <h6 className="font-medium">Kurir</h6>
                                        <button
                                            onClick={() => {
                                                setFormAddress(true), setDelivery(undefined);
                                            }}
                                            type="button"
                                            className="flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-danger text-white-primary"
                                        >
                                            <IconArrowBack size={16} stroke={2} />
                                            <span className="text-xs font-medium">Kembali</span>
                                        </button>
                                    </div>

                                    {delivery.map((delivery, index) => (
                                        <div
                                            className="p-5 mt-3 bg-white border rounded-lg shadow-md border-light-gray"
                                            key={index}
                                        >
                                            <p className="mb-3 text-sm font-medium text-dark-primary">
                                                {delivery.name}
                                            </p>
                                            {delivery.costs.map((cost, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="flex items-center justify-between w-full mb-2">
                                                        <p className="text-sm font-medium text-dark-primary">
                                                            {cost.service}
                                                        </p>
                                                        <p className="text-xs text-gray">{cost.description}</p>
                                                    </div>
                                                    {cost.cost.map((price, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => {
                                                                handlerSelectDelivery(
                                                                    `${delivery.name} - ${cost.service} (${cost.description})`,
                                                                    Number(price.value),
                                                                );
                                                                setModalDelivery(false);
                                                            }}
                                                            className="flex items-center justify-between w-full px-3 py-2 mb-5 border rounded-md border-light-gray"
                                                        >
                                                            <p>{formatCurrency.format(Number(price.value))}</p>
                                                            <p>{`(${price.etd}) Hari`}</p>
                                                        </button>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid items-center justify-center grid-cols-2 gap-5 mt-5">
                                    <div className="w-full">
                                        <label htmlFor="firstName" className="text-sm text-dark">
                                            Nama Depan
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            required
                                            placeholder="Jhon"
                                            autoComplete="off"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="lastName" className="text-sm text-dark">
                                            Nama Belakang
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            placeholder="Doe"
                                            autoComplete="off"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="nameAddress" className="text-sm text-dark">
                                            Nama Alamat
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            placeholder="Rumah, kantor, pabrik..."
                                            autoComplete="off"
                                            name="nameAddress"
                                            value={name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="building" className="text-sm text-dark">
                                            Tanda/Catatan
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            placeholder="Dekat..."
                                            autoComplete="off"
                                            name="building"
                                            value={building}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setBuilding(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="streetAddress" className="text-sm text-dark">
                                            Alamat
                                        </label>
                                        <input
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            name="street"
                                            autoComplete="off"
                                            placeholder="Jalan..."
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setStreet(e.target.value)
                                            }
                                            value={street}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="cityAddress" className="text-sm text-dark">
                                            Kota/Kabupaten
                                        </label>
                                        <Select
                                            options={optionsCity}
                                            className="mt-1"
                                            onChange={handlerChangeCity}
                                            value={city}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="provinceAddress" className="text-sm text-dark">
                                            Provinsi
                                        </label>
                                        <Select
                                            options={optionsProvince}
                                            className="mt-1"
                                            onChange={handlerChangeProvince}
                                            value={province}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="postalCode" className="text-sm text-dark">
                                            Kode Pos
                                        </label>
                                        <input
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            name="postal_code"
                                            autoComplete="off"
                                            placeholder="-----"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPostalCode(e.target.value)
                                            }
                                            value={postalCode}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="phone" className="text-sm text-dark">
                                            Telphone/Whatsapp
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            placeholder="------------"
                                            autoComplete="off"
                                            name="phone"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPhone(e.target.value)
                                            }
                                            value={phone}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="email" className="text-sm text-dark">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-1.5 mt-1 bg-white border rounded-[0.20rem] border-gray/40 outline-dark-primary"
                                            placeholder="jhondoe@mail.com"
                                            autoComplete="off"
                                            name="email"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-full gap-5">
                                        <label htmlFor="courierAddress" className="text-sm text-dark">
                                            Kurir
                                        </label>
                                        <Select
                                            className="w-full"
                                            options={optionsCourier}
                                            onChange={handlerChangeCourier}
                                            value={courier}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlerCheckOngkir}
                                        className="px-3 py-2 font-medium rounded bg-dark-primary text-white-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <IconLoader3 size={16} stroke={2} className="animate-spin" />
                                                <span>Loading...</span>
                                            </div>
                                        ) : (
                                            'Selanjutnya'
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col w-3/12 px-10 py-5 mx-auto text-center border shadow-lg rounded-xl border-light-gray bg-white-primary gap-y-3">
                            <h5 className="text-lg font-medium">Lanjutkan Transaksi?</h5>
                            <button
                                onClick={() => setFormAddress(true)}
                                type="button"
                                className="block w-full px-5 py-3 font-medium rounded-lg bg-dark-primary text-white-primary"
                            >
                                Pengisian Alamat
                            </button>
                            <button className="block w-full px-5 py-3 font-medium border rounded-lg bg-white-primary text-dark-primary border-light-gray">
                                <div className="flex items-center justify-center gap-1">
                                    <IconLogin2 size={18} stroke={1.7} /> <span>Masuk</span>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalDelivery(false)}
                                className="block w-full px-5 py-3 font-medium rounded-lg bg-danger text-white-primary"
                            >
                                <div className="flex items-center justify-center gap-1">
                                    <IconArrowBack size={18} stroke={1.7} /> <span>Batal</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
