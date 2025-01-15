// app/components/CartButton.tsx
//
import {IconButton, Badge} from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';

const CartButton = ({count}: { count: number }) => {

    const handleClick = () => {
    };

    return (
        <IconButton
            size="large"
            aria-label={`show ${count} items`}
            color="inherit"
            onClick={handleClick}
        >
            <Badge badgeContent={count} color="error">
                <ShoppingBag/>
            </Badge>
        </IconButton>
    );
};

export default CartButton;
