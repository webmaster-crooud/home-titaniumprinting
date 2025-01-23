import { DefaultCard } from '@/components/Card';
import { IconEye, IconEyeOff, IconLoader3, IconLogin2 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { AUTH, PANEL } from '../../../libs/utils';
import { useAuthToken } from '../../../hooks/useAuthToken';
import { useAtomValue } from 'jotai';
import { authAccount } from '../../../store/Atom';
import { jwtDecode } from 'jwt-decode';
interface Decoded {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    username: string;
    exp: number;
}
export default function LoginPage() {
    const router = useRouter();
    const [alert, setAlert] = useState<{ type: string; message: string } | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const auth = useAtomValue(authAccount);
    const handlerAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) {
            setError('Password tidak boleh kosong!');
        }
        if (password.length < 8) {
            setError('Password Harus Min.8 Karakter');
        }
        setLoading(true);
        try {
            const response = await fetch(`${AUTH}/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json', // Tambahan header jika diperlukan
                    Accept: 'application/json',
                },
                credentials: 'include', // Tambahkan ini
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();
            if (result.error) {
                setAlert({ type: 'error', message: result.message });
            } else {
                setAlert({ type: 'success', message: result.message });
                if (auth?.role === 'MEMBER') {
                    router.push(`/users/${auth.email}`);
                } else {
                    router.push(`${process.env.NEXT_PUBLIC_PANEL}`);
                }
            }
        } catch (error) {
            setAlert({ type: 'error', message: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mendapatkan nilai cookie berdasarkan nama
    const checkToken = async () => {
        try {
            const response = await fetch('/api/get-refresh-token', { credentials: 'include' });
            const data = await response.json();

            if (data.refreshToken) {
                // Redirect jika token ditemukan
                router.push('/'); // Ganti dengan halaman sesuai
            }
        } catch (error) {
            console.error('Error fetching refresh token:', error);
        }
    };
    useEffect(() => {
        const { status, message } = router.query;

        if (status && message) {
            if (status === 'success') {
                setAlert({ type: 'success', message: decodeURIComponent(String(message)) });
            } else if (status === 'error') {
                setAlert({ type: 'error', message: decodeURIComponent(String(message)) });
            }
        }

        // const authToken = getCookie('refreshToken'); // Ambil token dari cookie

        // if (authToken) {
        //     try {
        //         const decoded: Decoded = jwtDecode(authToken);

        //         // Validasi apakah token sudah kedaluwarsa
        //         if (decoded.exp * 1000 < Date.now()) {
        //             console.error('Token expired');
        //             document.cookie = 'AuthToken=; Max-Age=0'; // Hapus cookie jika kedaluwarsa
        //             return;
        //         }

        //         // Redirect berdasarkan role
        //         if (decoded.role === 'MEMBER') {
        //             router.push(`/users/${decoded.email}`);
        //         } else {
        //             router.push(`${process.env.NEXT_PUBLIC_PANEL}`);
        //         }
        //     } catch (error) {
        //         console.error('Invalid JWT:', error);
        //         // Biarkan pengguna tetap di halaman login jika token tidak valid
        //     }
        // }
        checkToken();
    }, [router.query]);
    return (
        <section className="flex items-center justify-between w-full min-h-screen">
            <div className="w-4/12 mx-auto">
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
                        Silahkan Masuk menggunakan Email dan Password Anda
                    </h6>

                    <form className="py-3 mt-5 border-t border-light-gray" onSubmit={handlerAuth}>
                        <div>
                            <label htmlFor="EmailUser" className="">
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
                            {error && <small className="text-xs text-danger">{error}</small>}
                        </div>

                        <button
                            className="flex items-center justify-center w-full gap-2 px-2 py-3 mt-5 text-white rounded bg-dark-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <IconLoader3 size={20} stroke={2} className="animate-spin" /> <span>Masuk</span>
                                </>
                            ) : (
                                <>
                                    <IconLogin2 size={20} stroke={2} /> <span>Masuk</span>
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
                    <Link href={'/register'} className="text-sm font-medium text-dark-primary">
                        Daftar Member
                    </Link>
                </div>
            </div>
        </section>
    );
}
