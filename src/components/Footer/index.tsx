import Link from 'next/link';
import { FAQSection } from '../Section/FAQ.section';
import { CTASection } from '../Section/CTA.section';
import Image from 'next/image';
import {
    IconBrandFacebookFilled,
    IconBrandLinkedin,
    IconBrandLinkedinFilled,
    IconBrandMeta,
    IconBrandX,
} from '@tabler/icons-react';

export const Footer = () => {
    return (
        <>
            {/* FAQ */}
            <FAQSection />

            {/* CTA */}
            <CTASection />

            <footer className="w-full py-16 text-white bg-dark">
                <div className="w-10/12 mx-auto mb-16">
                    <div className="flex flex-col items-start justify-between xl:flex-row">
                        <div>
                            <h4 className="text-base font-medium">Navigation</h4>
                            <ul className="mt-4 opacity-80">
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        What We Do
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        To The Power of 10
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Donate
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-medium">What We Do</h4>
                            <ul className="mt-4 opacity-80">
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Encouraging Testing
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Strengthening Advocacy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Sharing Information
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Building Leadership
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Engaging With Global Fund
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Shining a Light
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-medium uppercase">Legal</h4>
                            <ul className="mt-4 opacity-80">
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        General Info
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-medium uppercase">TALK TO US</h4>
                            <ul className="mt-4 opacity-80">
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        support@ercom.com
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="text-sm">
                                        +66 2399 1145
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <p className="text-sm text-white underline select-none decoration-wavy decoration-blue">
                                        Contact Us
                                    </p>
                                    <ul className="mt-1">
                                        <li>
                                            <Link href={''}>Facebook</Link>
                                        </li>
                                        <li>
                                            <Link href={''}>Linkedin</Link>
                                        </li>
                                        <li>
                                            <Link href={''}>Twitter</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-10/12 pt-10 mx-auto border-t border-white/10">
                    <div className="flex flex-col items-center justify-between gap-y-4 xl:flex-row">
                        <Link href="/">
                            <Image
                                alt="Titanium Printing logo"
                                src="/assets/white-logo.svg"
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                            <h1 className="sr-only">Titanium Printing</h1>
                        </Link>

                        <p className="text-sm font-normal text-center text-gray">
                            &copy; 2024 Titanium Print. All Rights Reserved.{' '}
                        </p>

                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href={''}
                                className="hover:rotate-[360deg] transition-transform ease-out duration-300"
                            >
                                <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-white/25">
                                    <IconBrandMeta size={18} />
                                </div>
                            </Link>
                            <Link
                                href={''}
                                className="hover:rotate-[360deg] transition-transform ease-out duration-300"
                            >
                                <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-white/25">
                                    <IconBrandLinkedin size={18} />
                                </div>
                            </Link>
                            <Link
                                href={''}
                                className="hover:rotate-[360deg] transition-transform ease-out duration-300"
                            >
                                <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-white/25">
                                    <IconBrandX size={18} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
