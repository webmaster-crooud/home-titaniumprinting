import Image from 'next/image';
import { SearchNavbar } from './Search.navbar';
import { MenuNavbar } from './Menu.navbar';
import { inter } from '../../../libs/utils';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <>
            <nav className={`w-full bg-white py-5 border-b border-light-gray ${inter.className}`}>
                <div className="flex items-center justify-between w-10/12 mx-auto">
                    <div className="flex items-center justify-start gap-8">
                        <Link href="/">
                            <Image
                                alt="Titanium Printing logo"
                                src="/assets/logo.png"
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                            <h1 className="sr-only">Titanium Printing</h1>
                        </Link>
                        <SearchNavbar />
                    </div>

                    <MenuNavbar />
                </div>
            </nav>
        </>
    );
};
