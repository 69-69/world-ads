'use client';

import Container from "@mui/material/Container";
import PostForm from '@/app/components/post/PostForm';
import usePostAd from '@/app/hooks/usePostAd';

const ProductByCategoryPage = () => {
    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 5}}>

            <PostForm
                title="Post Listing"
                buttonText="Submit"
                fields={[
                    {name: 'title', label: 'Title', fullWidth: true},
                    {name: 'regular_price', label: 'Regular Price', fullWidth: false},
                    {name: 'sales_price', label: 'Sales Price', fullWidth: false},
                    {name: 'condition', label: 'Condition', fullWidth: false},
                    {name: 'stock_level', label: 'Stock Level', fullWidth: false},
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
                ]}
                onSubmit={usePostAd}
            />
        </Container>
    );
};
export default ProductByCategoryPage
