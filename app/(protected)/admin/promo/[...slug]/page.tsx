'use client';
import React, {use} from 'react';
import Container from "@mui/material/Container";
import PromoForm from '@/app/components/post/PromoForm';
import usePostPromo from '@/app/hooks/usePostPromo';

const ProductByCategoryPage = ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = use(params);
    console.log('slug', slug);

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <PromoForm
                title="Schedule Your Deals"
                buttonText="Submit"
                fields={[
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: false},
                    {name: 'title', label: 'Title', fullWidth: true},
                    {name: 'promo_price', label: 'Deal Price', fullWidth: true},
                ]}
                product_id={slug.at(1)!.toString()}
                onSubmit={usePostPromo}
            />
        </Container>
    );
};
export default ProductByCategoryPage
