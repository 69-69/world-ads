'use client';

import Container from "@mui/material/Container";
import PostForm from '@/app/components/post/PostForm';
import createProduct from '@/app/actions/admin/createProduct';

const CreatePage = () => {
    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 5}}>

            <PostForm
                title="Post Listing"
                buttonText="Submit"
                fields={[
                    {name: 'name', label: 'Name', fullWidth: false},
                    {name: 'stock_level', label: 'Stock Level', fullWidth: false},
                    {name: 'regular_price', label: 'Regular Price', fullWidth: false},
                    {name: 'sales_price', label: 'Sales Price', fullWidth: false},
                    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
                ]}
                onSubmit={createProduct}
            />
        </Container>
    );
};
export default CreatePage
