'use client';
import React from 'react';
import Container from "@mui/material/Container";
import PostForm from '@/app/components/PostForm';
import usePostAd from '@/app/hooks/usePostAd';

const PostAdsPage = () => {
    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <PostForm
                title="Post New Ad"
                buttonText="Submit Ad"
                fields={[
                    {name: 'title', label: 'Title'},
                    {name: 'price', label: 'Price'},
                ]}
                onSubmit={usePostAd}
            />
        </Container>
    );
};

export default PostAdsPage;


