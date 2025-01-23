import React, { useCallback, useEffect, useState } from 'react';
import { Address, Cart, Customer } from '../../../libs/type';
import { useAtom, useAtomValue } from 'jotai';
import { IconCloudUpload, IconX } from '@tabler/icons-react';
import UploadedFile from './UploadFile';
import { authAccount, cartAtom } from '../../../store/Atom';
import Link from 'next/link';
import { BACKEND } from '../../../libs/utils';

interface rajaOngkirDataCity {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}

export const TransactionForm = () => {
    const auth = useAtomValue(authAccount);
    const [cart, setCart] = useAtom(cartAtom);
    const [isCustomer, setIsCustomer] = useState<boolean>(false);
    const [cities, setCities] = useState<rajaOngkirDataCity[]>([]);
    const [loading, setLoading] = useState<{ field: string } | undefined>(undefined);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Validasi tipe file
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
            alert('Hanya file PDF, PNG, dan JPG yang diizinkan!');
            return;
        }

        // Validasi ukuran file
        if (file.size > 5 * 1024 * 1024) {
            // 5MB
            alert('Ukuran file tidak boleh lebih dari 5MB!');
            return;
        }

        // Tambahkan file ke state cart
        setCart((prevCart) => ({
            ...prevCart,
            files: [...(prevCart.files || []), file], // Simpan file
        }));
    };
    const handleRemoveFile = (index: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            files: prevCart.files.filter((_, i) => i !== index), // Hapus file berdasarkan index
        }));
    };
    const changeInput = (
        value: string,
        field: keyof Cart | 'customer' | 'address',
        nestedField?: keyof Customer | keyof Address,
    ) => {
        let newCart = { ...cart };

        if (field === 'customer' && nestedField && newCart.customer) {
            // Jika field adalah 'customer' dan ada nestedField, kita mengubah nested field di dalam customer
            newCart = {
                ...newCart,
                customer: {
                    ...newCart.customer,
                    [nestedField]: value, // nestedField adalah keyof Customer
                },
            };
        } else if (field === 'address' && nestedField && newCart.customer?.address) {
            // Jika field adalah 'address' dan ada nestedField, kita mengubah nested field di dalam address
            newCart = {
                ...newCart,
                customer: {
                    ...newCart.customer,
                    address: {
                        ...newCart.customer.address,
                        [nestedField]: value, // nestedField adalah keyof Address
                    },
                },
            };
        } else if (field in newCart) {
            // Jika field bukan 'customer' atau 'address', kita mengubah field langsung di cart
            newCart = { ...newCart, [field]: value };
        } else {
            console.error(`Field "${field}" does not exist in the cart object.`);
        }

        setCart(newCart);
    };
    const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityId = e.target.value;
        const filterSelectedCity = cities.find((city) => city.city_id === selectedCityId);

        if (filterSelectedCity) {
            setCart((prevCart) => {
                const newCart = {
                    ...prevCart,
                    customer: {
                        ...prevCart.customer,
                        address: {
                            ...prevCart.customer.address,
                            city: filterSelectedCity.city_name,
                            cityId: selectedCityId,
                            province: filterSelectedCity.province,
                            postalCode: filterSelectedCity.postal_code,
                        },
                    },
                };
                return newCart;
            });
        }
    };

    const fetchCities = useCallback(async () => {
        try {
            const response = await fetch(`${BACKEND}/rajaongkir/city`);
            const result = await response.json();

            const { data } = result;
            setCities(
                data.map((city: rajaOngkirDataCity) => ({
                    city_id: city.city_id,
                    province_id: city.province_id,
                    province: city.province,
                    type: city.type,
                    city_name: city.city_name,
                    postal_code: city.postal_code,
                })),
            );
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);
    const uniqueProvinces = Array.from(new Set(cities.map((city) => city.province)));
    console.log(cart);
    return (
        <section className="w-full pt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-dark-primary">Detail Pesanan</h3>
                {isCustomer && (
                    <button
                        type="button"
                        onClick={() => setIsCustomer(false)}
                        className="flex items-center justify-center gap-2 px-5 py-2 text-sm text-white rounded-lg bg-danger ms-auto"
                    >
                        <IconX stroke={2.5} size={16} />
                        <span>Batal</span>
                    </button>
                )}
            </div>
            <div className="relative my-5">
                {isCustomer ? (
                    <div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="text-xs font-semibold uppercase text-dark-primary"
                                >
                                    Nama Depan
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="John"
                                    value={cart.customer?.firstName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(e.target.value, 'customer', 'firstName')
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="text-xs font-semibold uppercase text-dark-primary">
                                    Nama Belakang
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="Doe"
                                    value={cart.customer?.lastName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(e.target.value, 'customer', 'lastName')
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-xs font-semibold uppercase text-dark-primary">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="john.doe@mail.com"
                                    value={cart.customer?.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(e.target.value, 'customer', 'email')
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-xs font-semibold uppercase text-dark-primary">
                                    No. Handphone/Whatsapp
                                </label>
                                <div className="flex items-center justify-start overflow-hidden text-sm border rounded-lg outline-none bg-white-primary border-light-gray">
                                    <div className="px-3 py-2 text-sm outline-snone bg-light-gray">+62</div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full px-3 py-2 text-sm outline-none bg-white-primary"
                                        autoComplete="off"
                                        placeholder="8XX-XXXX-XXXX"
                                        value={cart.customer?.phone}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            changeInput(String(e.target.value), 'customer', 'phone')
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="street" className="text-xs font-semibold uppercase text-dark-primary">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="Jl. Raya Indonesia No X"
                                    value={cart.customer?.address.street}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(String(e.target.value), 'address', 'street')
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="text-xs font-semibold uppercase text-dark-primary">
                                    Kota
                                </label>
                                <select
                                    name="city"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none appearance-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    value={cart.customer?.address.cityId}
                                    onChange={handleChangeCity}
                                >
                                    <option value="" disabled>
                                        Pilih Pengiriman
                                    </option>
                                    {cities.map((city, idx) => (
                                        <option value={city.city_id} key={idx}>
                                            {city.city_name}, {city.province} - {city.postal_code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="province" className="text-xs font-semibold uppercase text-dark-primary">
                                    Provinsi
                                </label>
                                <select
                                    name="province"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none appearance-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    value={cart.customer?.address.province}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        changeInput(String(e.target.value), 'address', 'province')
                                    }
                                >
                                    <option value="" disabled>
                                        Pilih Provinsi
                                    </option>
                                    {uniqueProvinces.map((province, index) => (
                                        <option value={province} key={index}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="postalCode"
                                    className="text-xs font-semibold uppercase text-dark-primary"
                                >
                                    Kode Pos
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="XXXXXX"
                                    value={cart.customer?.address.postalCode}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(String(e.target.value), 'address', 'postalCode')
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="building" className="text-xs font-semibold uppercase text-dark-primary">
                                    Bangunan
                                </label>
                                <input
                                    type="text"
                                    name="building"
                                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                                    autoComplete="off"
                                    placeholder="Hotel, Pasar dan lainnya"
                                    value={cart.customer?.address.building}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        changeInput(String(e.target.value), 'address', 'building')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : !auth ? (
                    <div className="flex items-center justify-between w-full gap-3">
                        <Link
                            href={'/login'}
                            className="flex items-center justify-center w-full gap-1 px-5 py-2 text-sm font-semibold text-white rounded-lg bg-dark-primary"
                        >
                            Masuk / Daftar
                        </Link>
                        <button
                            onClick={() => setIsCustomer(true)}
                            type="button"
                            className="flex items-center justify-center w-full gap-1 px-5 py-2 text-sm font-semibold rounded-lg text-dark-primary bg-warning"
                        >
                            Form Pembelian
                        </button>
                    </div>
                ) : (
                    <section>
                        <div></div>
                    </section>
                )}
            </div>
            {/* Input untuk notes */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray">Catatan (Opsional)</label>
                <textarea
                    className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white-primary border-light-gray"
                    placeholder="Tambahkan catatan untuk pesanan Anda"
                    value={cart.notes}
                    onChange={(e) =>
                        setCart((prevCart) => ({
                            ...prevCart,
                            notes: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="flex items-end justify-end w-full gap-5 my-8">
                <div className="w-full">
                    <h5 className="font-semibold text-dark">File Upload</h5>
                    <p className="mt-3 text-sm text-gray">
                        File berformat PDF, PNG, JPG dengan resolusi terbaik.{' '}
                        <a href="" className="text-dark-primary">
                            Baca Instruksi File
                        </a>
                    </p>
                </div>

                {/* Input upload file */}
                <div className="relative transition-all duration-300 ease-in-out cursor-pointer hover:scale-105">
                    <input
                        type="file"
                        className="opacity-0 absolute z-[1] cursor-pointer w-full"
                        onChange={handleFileUpload}
                        accept=".pdf,.png,.jpg,.jpeg" // Hanya izinkan file PDF, PNG, dan JPG
                    />
                    <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white border rounded-lg cursor-pointer border-light-gray text-dark">
                        <IconCloudUpload size={20} stroke={2} />
                        <span className="text-sm font-semibold text-nowrap">Upload (PDF, PNG, JPG)</span>
                    </div>
                </div>
            </div>
            {/* Tampilkan file yang sudah diunggah */}
            <div className="grid grid-cols-3 gap-3">
                {cart.files?.map((file, index) => (
                    <UploadedFile
                        key={index}
                        file={file}
                        onRemove={() => handleRemoveFile(index)} // Hapus file berdasarkan index
                    />
                ))}
            </div>
        </section>
    );
};
