'use client';
import React from 'react';
import Container from "@mui/material/Container";
import PostForm from '@/app/components/post/PostForm';
import createProduct from '@/app/actions/admin/createProduct';

const PostAdsPage = () => {
    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <PostForm
                title="Post Your Listing"
                buttonText="Submit"
                fields={[
                    {name: 'name', label: 'Name', fullWidth: true},
                    {name: 'price', label: 'Price', fullWidth: true},
                    {name: 'discount_price', label: 'Discount Price', fullWidth: true},
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
                ]}
                onSubmit={createProduct}
            />
        </Container>
    );
};

export default PostAdsPage;


