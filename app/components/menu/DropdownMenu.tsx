// app/components/menu/DropdownMenu.tsx
//
import {Menu, MenuItem} from '@mui/material';

interface RenderDropdownProps {
    anchorEl: null | HTMLElement;
    handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const DropdownMenu: React.FC<RenderDropdownProps> = ({anchorEl, setAnchorEl}) => {
    const isMenuOpen = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu"
            keepMounted
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
        </Menu>
    );
};

export default DropdownMenu;
