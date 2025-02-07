import { IconSearch } from '@tabler/icons-react';

export const SearchNavbar = () => {
    return (
        <form className="items-center justify-center hidden md:flex">
            <input
                type="text"
                className="w-full px-3 py-3 border border-r-0 rounded-md rounded-r-none outline-none border-light-gray"
                placeholder="Cari Produk"
            />
            <button className="px-3 py-3 border border-l-0 rounded-md rounded-l-none border-light-gray">
                <IconSearch size={24} stroke={2} />
            </button>
        </form>
    );
};
