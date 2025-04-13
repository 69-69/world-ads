import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProductCard from './ProductCard';

// Importing the local image
const productImg = '../assets/images/product.jpg';

const posts = [
    {
        id: 1,
        title: "Special Offer",
        seller: "Special Offer",
        description: "Get 50% off your first purchase. Don't miss out!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/offer1"
    },
    {
        id: 2,
        title: "New Product",
        seller: "Special Offer",
        description: "Introducing our new collection of gadgets. Shop now!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/new-products"
    },
    {
        id: 3,
        title: "Winter Sale",
        seller: "Special Zeo",
        description: "Up to 70% off on winter clothing. Hurry, limited time offer!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/winter-sale"
    },
    {
        id: 4,
        title: "Free Shipping",
        seller: "Special Zeo",
        description: "Enjoy free shipping on orders over $50. Shop now!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/free-shipping"
    },
    {
        id: 5,
        title: "Free Shipping",
        seller: "Special Two",
        description: "Enjoy free shipping on orders over $50. Shop now!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/free-shipping"
    },
    {
        id: 6,
        title: "Free Shipping",
        seller: "Special One",
        description: "Enjoy free shipping on orders over $50. Shop now!",
        imageUrl: productImg,
        price: "$19.99",
        link: "/free-shipping"
    }
];

const HomeContent = () => {
    return (
        <Box maxWidth="lg" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4} justifyContent="center">
                {posts.map((ad) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ad.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ProductCard
                            image={ad.imageUrl}
                            title={ad.title}
                            subheader={ad.seller}
                            description={ad.description}
                            price={ad.price}
                            link={ad.link}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomeContent;
