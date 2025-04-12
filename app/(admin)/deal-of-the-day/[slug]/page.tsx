'use client';
import React, {use} from 'react';
import Container from "@mui/material/Container";
import PostForm from '@/app/components/post/PostForm';
import usePostAd from '@/app/hooks/usePostAd';

const ProductByCategoryPage = ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = use(params);

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <p>Page: {slug}</p>
            <PostForm
                title="Create New Deals"
                buttonText="Submit"
                fields={[
                    {name: 'title', label: 'Title', fullWidth: true},
                    {name: 'promo_price', label: 'Deal Price', fullWidth: true},
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
                ]}
                onSubmit={usePostAd}
            />
        </Container>
    );
};
export default ProductByCategoryPage
