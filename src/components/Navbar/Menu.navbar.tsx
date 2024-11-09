import { IconHelpCircle, IconShoppingBag } from '@tabler/icons-react';
import { DefaultButton } from '../Button';

export const MenuNavbar = () => {
    return (
        <div className="flex items-center justify-end gap-5">
            <div className="flex items-center jusitify-center gap-1 border-r border-light-gray px-5">
                <DefaultButton link="/" title="Cara Kerja" icon={<IconHelpCircle size={28} stroke={1.6} />} />
                <DefaultButton link="/" title="Keranjang" icon={<IconShoppingBag size={28} stroke={1.6} />} />
            </div>
            <DefaultButton link="/login" title="Masuk" />
        </div>
    );
};
