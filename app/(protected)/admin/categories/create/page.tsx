'use client';
import {Container, Box, Paper, Typography, TextField, Button} from "@mui/material";
import {handleSubmit} from "@/app/actions/admin/createCategory";
import MiniDropdown from "@/app/components/MiniDropdown";
import {PARENT_CATEGORIES} from "@/app/actions/useConstants";

const CreatePage = () => {
    const errors = {
        category: 'Category is required',
        parent_category: 'Parent category is required',
    };

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 5}}>
            <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
                <Box sx={{mb: 2}}>
                    <Typography fontWeight="bold" variant="h6" align="center" gutterBottom>
                        Add New Category
                    </Typography>
                </Box>
                <Box
                    component="form"
                    action={handleSubmit}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                        gap: 2,
                        width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        name="category"
                        label="Enter brand name"
                        variant="outlined"
                        size="small"
                        error={!!errors.category}
                        helperText={errors.category}
                    />
                    <MiniDropdown
                        name="parent_category"
                        options={PARENT_CATEGORIES}
                        label="Parent Category"
                        isError={!!errors.parent_category}
                        isFullWidth
                        helperText={errors.parent_category}
                        defaultValue={PARENT_CATEGORIES[0].value}
                    />
                    <Button type="submit" variant="outlined" color="primary" sx={{gridColumn: '1/-1', mb: 2}}>
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreatePage;
