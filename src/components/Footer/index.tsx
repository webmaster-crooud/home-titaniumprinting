import Link from 'next/link';
import { FAQSection } from '../Section/FAQ.section';
import { CTASection } from '../Section/CTA.section';
import Image from 'next/image';
import { IconBrandFacebookFilled, IconBrandLinkedin, IconBrandLinkedinFilled, IconBrandMeta, IconBrandX } from '@tabler/icons-react';

export const Footer = () => {
    return (
        <>
            {/* FAQ */}
            <FAQSection />

            {/* CTA */}
            <CTASection />

            <footer className="bg-dark text-white w-full py-16">
                <div className="w-10/12 mx-auto mb-16">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-base">Navigation</h4>
                            <ul className="opacity-80 mt-4">
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
                            <h4 className="font-medium text-base">What We Do</h4>
                            <ul className="opacity-80 mt-4">
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
                            <h4 className="font-medium text-base uppercase">Legal</h4>
                            <ul className="opacity-80 mt-4">
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
                            <h4 className="font-medium text-base uppercase">TALK TO US</h4>
                            <ul className="opacity-80 mt-4">
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
                                    <p className="text-sm underline decoration-wavy decoration-blue select-none text-white">Contact Us</p>
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
                <div className="w-10/12 mx-auto pt-10 border-t border-white/10">
                    <div className="flex items-center justify-between">
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

                        <p className="text-sm text-gray font-normal text-center">&copy; 2024 Titanium Print. All Rights Reserved. </p>

                        <div className="flex items-center justify-end gap-3">
                            <Link href={''} className="hover:rotate-[360deg] transition-transform ease-out duration-300">
                                <div className="flex items-center justify-center w-10 h-10 border-2 border-white/25 rounded-full">
                                    <IconBrandMeta size={18} />
                                </div>
                            </Link>
                            <Link href={''} className="hover:rotate-[360deg] transition-transform ease-out duration-300">
                                <div className="flex items-center justify-center w-10 h-10 border-2 border-white/25 rounded-full">
                                    <IconBrandLinkedin size={18} />
                                </div>
                            </Link>
                            <Link href={''} className="hover:rotate-[360deg] transition-transform ease-out duration-300">
                                <div className="flex items-center justify-center w-10 h-10 border-2 border-white/25 rounded-full">
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
