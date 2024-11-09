import { IconSearch } from '@tabler/icons-react';

export const SearchNavbar = () => {
    return (
        <form className="flex items-center justify-center">
            <input
                type="text"
                className="px-3 py-3 border border-light-gray outline-none w-full rounded-md border-r-0 rounded-r-none"
                placeholder="Cari Produk"
            />
            <button className="px-3 py-3 border border-light-gray rounded-md border-l-0 rounded-l-none">
                <IconSearch size={24} stroke={2} />
            </button>
        </form>
    );
};
