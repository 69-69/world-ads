import React from 'react';
import Container from "@mui/material/Container";
import PostForm from '@/app/components/PostForm';
import {postAd} from "@/app/api/auth/backend";

const PostAdsPage = () => {

    // Form submission handler
    const handlePostAd = async (formDataWithFiles: FormData) => {
        try {
            const response = await postAd(formDataWithFiles);
            console.log('Post Ad successful', response);

            // Optionally show success message or redirect
        } catch (error) {
            console.error('Error posting ad:', error);
            throw new Error(error instanceof Error ? error?.message : '');
        }
    };

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <PostForm
                title="Post New Ad"
                buttonText="Submit Ad"
                fields={[
                    {name: 'title', label: 'Title'},
                    {name: 'price', label: 'Price'},
                ]}
                onSubmit={handlePostAd}
            />
        </Container>
    );
};

export default PostAdsPage;


