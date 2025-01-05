import React from 'react';
import {useRouter} from 'next/navigation';
import {IconButton, Badge} from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';

const CartButton = ({count}: { count: number }) => {
    const navigate = useRouter(); // Initialize the navigate function

    const handleClick = () => {
        navigate.push('/shopping-cart'); // Navigate to shopping cart route
    };

    return (
        <IconButton size="large" aria-label={`show ${count} items`} color="inherit" onClick={handleClick}>
            <Badge badgeContent={count} color="error">
                <ShoppingBag/>
            </Badge>
        </IconButton>
    );
};

export default CartButton;
