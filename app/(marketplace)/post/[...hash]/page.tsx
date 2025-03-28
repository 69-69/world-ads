'use client';
import React from 'react';
import Container from "@mui/material/Container";
import PostForm from '@/app/components/post/PostForm';
import usePostAd from '@/app/hooks/usePostAd';

const PostAdsPage = () => {
    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <PostForm
                title="Post Your Listing"
                buttonText="Submit"
                fields={[
                    {name: 'title', label: 'Title', fullWidth: true},
                    {name: 'price', label: 'Price', fullWidth: true},
                    {name: 'discount_price', label: 'Discount Price', fullWidth: true},
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
                ]}
                onSubmit={usePostAd}
            />
        </Container>
    );
};

export default PostAdsPage;


