import React from "react";
import {Menu, MenuItem} from '@mui/material';
import {toTitleCase} from "@/app/util/clientUtils";
import {ADMIN_DASHBOARD_ROUTE} from "@/app/util/constants";
import {useRouter} from "next/navigation";
import {signOut} from "@/app/actions/auth/handleSignOut";

interface RenderDropdownProps {
    user?: Record<string, unknown> | null;
    anchorEl: null | HTMLElement;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    // handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
}

const DropdownMenu: React.FC<RenderDropdownProps> = ({anchorEl, setAnchorEl, user}) => {
    const isMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const menuItems = [
        {label: 'Profile', action: () => console.log('Profile')},
        {label: 'My account', action: () => console.log('My account')},
        {label: 'Settings', action: () => router.push(ADMIN_DASHBOARD_ROUTE)},
        {
            label: 'Sign out', action: async () => await signOut()
        },
    ];

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu"
            keepMounted
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            {menuItems.map((item, index) => {
                if (item.label.toLowerCase() === 'profile' && user) {
                    item.label = (user as { name: string }).name;
                }
                return (
                    <MenuItem key={index} onClick={item.action}>
                        {toTitleCase(item.label)}
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export default DropdownMenu;
