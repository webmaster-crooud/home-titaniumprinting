import { DefaultCard } from '@/components/Card';
import { IconCloudUpload, IconEye, IconEyeOff, IconLoader3 } from '@tabler/icons-react';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { AUTH } from '../../../libs/utils';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [alert, setAlert] = useState<{ type: string; message: string } | undefined>(undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlerSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password Harus Min.8 Karakter');
        }
        if (password !== confirmPassword) {
            setError('Konfirmasi Password Tidak Valid');
        }
        if (!password && !confirmPassword) {
            setError('Password tidak boleh kosong!');
        }
        setLoading(true);
        try {
            const response = await fetch(`${AUTH}/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                }),
            });

            const result = await response.json();
            if (result.error) {
                setAlert({ type: 'error', message: result.message });
            } else {
                router.push(`/verify/${email}`);
                setAlert({ type: 'success', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="flex items-center justify-between w-full min-h-screen py-10">
            <div className="w-5/12 mx-auto">
                {alert && (
                    <div
                        className={`w-full p-3 rounded border mb-5 ${
                            alert.type === 'error'
                                ? 'bg-warning/30 border-danger text-danger'
                                : 'bg-warning/30 border-dark-primary text-dark-primary'
                        }`}
                    >
                        <p>{alert.message}</p>
                    </div>
                )}
                <DefaultCard padding border>
                    <div className="w-4/12 mx-auto mb-3">
                        <Image
                            src={'/assets/logo.png'}
                            width={200}
                            height={200}
                            style={{ width: '100%', height: 'auto' }}
                            alt=""
                            priority
                        />
                    </div>

                    <h6 className="text-sm text-center text-dark-primary">
                        Silahkan Lengkapi Formulir Pendaftaran Member
                    </h6>

                    <form className="py-3 mt-5 border-t border-light-gray" onSubmit={handlerSubmitRegister}>
                        <div>
                            <label htmlFor="EmailORUsername" className="">
                                Email
                            </label>
                            <input
                                disabled={loading}
                                type="email"
                                className="block w-full px-4 py-2 text-sm border rounded outline-none border-light-gray"
                                placeholder="john.doe@mail.com"
                                autoComplete="off"
                                name="email"
                                required
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <div className="w-full mt-3">
                                <label htmlFor="FirstName" className="">
                                    Nama Depan
                                </label>
                                <input
                                    type="text"
                                    disabled={loading}
                                    className="block w-full px-4 py-2 text-sm border rounded outline-none border-light-gray"
                                    placeholder="Johnny"
                                    autoComplete="off"
                                    name="firstName"
                                    required
                                    value={firstName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-3">
                                <label htmlFor="LastName" className="">
                                    Nama Belakang
                                </label>
                                <input
                                    type="text"
                                    disabled={loading}
                                    className="block w-full px-4 py-2 text-sm border rounded outline-none border-light-gray"
                                    placeholder="Doe"
                                    autoComplete="off"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="Password" className="">
                                Password
                            </label>
                            <div className="flex items-center justify-end w-full border rounded outline-none border-light-gray">
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    disabled={loading}
                                    className="block w-full px-4 py-2 text-sm outline-none"
                                    placeholder="********"
                                    autoComplete="off"
                                    name="password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="px-4 py-2 bg-light-gray text-dark-primary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="ConfirmPassword" className="">
                                Konfirmasi Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={loading}
                                className="block w-full px-4 py-2 text-sm border rounded outline-none border-light-gray"
                                placeholder="********"
                                autoComplete="off"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setConfirmPassword(e.target.value);
                                    setError(undefined);
                                }}
                            />
                            {error && <small className="text-xs text-danger">{error}</small>}
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="flex items-center justify-center w-full gap-2 px-2 py-3 mt-5 text-white rounded bg-dark-primary"
                        >
                            {loading ? (
                                <>
                                    <IconLoader3 className="animate-spin" size={20} stroke={2} /> <span>Daftar</span>
                                </>
                            ) : (
                                <>
                                    <IconCloudUpload size={20} stroke={2} /> <span>Daftar</span>
                                </>
                            )}
                        </button>
                    </form>
                </DefaultCard>

                <div className="flex items-center justify-center gap-3 mt-5">
                    <Link href={'/forgot'} className="text-sm font-medium text-dark-primary">
                        Lupa Password Akun?
                    </Link>
                    <div>|</div>
                    <Link href={'/login'} className="text-sm font-medium text-dark-primary">
                        Login Member
                    </Link>
                </div>
            </div>
        </section>
    );
}
