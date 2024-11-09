import { SubMenuNavbar } from '@/components/Navbar/SubMenu.navbar';
import { BACKEND } from '../../libs/utils';
import { Categories } from '../../libs/type';
import { Header } from '@/components/Header';

export default function Home({ categories }: { categories: Categories[] }) {
    return (
        <>
            <SubMenuNavbar categories={categories} />
            <Header />
        </>
    );
}

export async function getStaticProps() {
    const response = await fetch(`${BACKEND}/categories`);
    const { data } = await response.json();
    const categories: Categories[] = data;

    return {
        props: {
            categories,
        },
        revalidate: 1 * 60 * 60,
    };
}
