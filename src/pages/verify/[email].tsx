import { DefaultCard } from '@/components/Card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AUTH } from '../../../libs/utils';
import { IconLoader3 } from '@tabler/icons-react';

export default function EmailVerifyPage() {
    const router = useRouter();
    const { email } = router.query;
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<{ type: string; message: string } | undefined>(undefined);

    const handlerResendEmail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${AUTH}/email-verify/${email}`, {
                method: 'PATCH',
            });
            const result = await response.json();
            if (result.error) {
                setAlert({ type: 'error', message: `${result.message}` });
            } else {
                setAlert({ type: 'success', message: `${result.message}` });
            }
        } catch (error) {
            setAlert({ type: 'error', message: `${error}` });
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="flex items-center justify-center w-full min-h-screen">
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
                    <h1 className="text-xl font-semibold text-dark-primary">Pendaftaran Berhasil</h1>
                    <p className="mt-3 text-sm font-medium text-gray">
                        Kami telah mengirimkan email verifikasi, silahkan melakukan konfirmasi untuk melanjutkan proses
                        pendaftaran: {email}
                    </p>

                    <button
                        type="button"
                        onClick={handlerResendEmail}
                        className="w-full px-4 py-2 mt-5 font-semibold tracking-wider rounded bg-dark-primary text-white-primary"
                    >
                        {loading ? <IconLoader3 className="animate-spin" /> : 'Kirim Ulang Email'}
                    </button>
                </DefaultCard>
            </div>
        </section>
    );
}
