'use client';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import React, {use, useState} from "react";
import {handleEdit} from "@/app/actions/admin/editProduct";
import {useSearchParams} from 'next/navigation';
import {Product} from '@/app/models/Post';
import {removeSpecialChars, toTitleCase} from '@/app/actions/useHelper';
import BrandsDropdown from "@/app/components/BrandsDropdown";
import SubCategoriesDropdown from "@/app/components/SubCategoriesDropdown";
import ConditionsDropdown from "@/app/components/ConditionsDropdown";
import ParentCategoriesDropdown from "@/app/components/ParentCategoriesDropdown";
import StatusSnackbar from "@/app/components/StatusSnackbar";


function getQueryParamAsObject<T>(param: string | string[] | null | undefined): T | null {
    if (typeof param === 'string') {
        try {
            return JSON.parse(param) as T;
        } catch {
            return null;
        }
    }
    return null;
}

const exclude_this = ['hashed_id', 'images', 'store_id', 'is_promo', 'published', 'product_colors', 'slug'];
const exclude_keys = ['condition', 'brand', 'sub_category', 'category'];

const EditProductPage = ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = use(params);
    console.log(`product ${slug}`);

    const searchParams = useSearchParams();
    const productParam = searchParams.get('product') || '';
    const product: Product | null = getQueryParamAsObject<Product>(productParam);

    const initialEntries = product
        ? Object.entries(product).filter(([key]) => !exclude_this.includes(key))
        : [];

    type ProductEntry = [keyof Product, Product[keyof Product]];
    const [productEntries, setProductEntries] = useState<ProductEntry[]>(
        initialEntries as ProductEntry[]
    );
    const [expanded, setExpanded] = useState<string | false>(false);
    const [status, setStatus] = useState<{open:boolean, msg?:string}>({open: false});

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = async (formData: FormData) => {
        await handleEdit(formData);

        const updatedKey = formData.get('key') as keyof Product;
        const updatedValue = formData.get('value') as Product[keyof Product];
        setStatus({open: true});

        setProductEntries(prev =>
            prev.map(([k, v]) => (k === updatedKey ? [k, updatedValue] : [k, v]))
        );

    };
    const handleClose = () => setStatus({open: false});

    if (!product) {
        return (
            <Container maxWidth="sm" sx={{ pt: 5 }}>
                <Typography variant="h6">Invalid product data</Typography>
            </Container>
        );
    }
    const errors = {
        brand: '',
        condition: '',
        category: '',
        sub_category: '',
    }

    return (
        <Container maxWidth="md" sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom sx={{mb: 3}}>
                Edit {toTitleCase(product.name)}
            </Typography>
            {
                productEntries.map(([key, value]) => (

                    <Box key={`${key}form-data`}
                         component="form" action={handleSubmit}
                         noValidate
                         autoComplete="off">
                        <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
                            <AccordionSummary
                                expandIcon={<Link key={`${key}-toggle-btn`} href="#" variant="body2"
                                                  underline="none">Edit</Link>}
                                aria-controls={`${key}-content`}
                                id={`${key}-header`}
                            >
                                <Typography component="span" fontWeight='bold' sx={{width: '33%', flexShrink: 0}}>
                                    {toTitleCase(removeSpecialChars(key))}
                                </Typography>
                                <Typography component="span" sx={{color: 'text.secondary'}}>
                                    {toTitleCase(value?.toString() ?? '')}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    key === 'category' && (<ParentCategoriesDropdown
                                        label="Category"
                                        name="value"
                                        defaultVal={value?.toString()}
                                        onSelectChange={() => {
                                        }}
                                        isError={errors['category']}
                                        isFullWidth={false}
                                    />)
                                }
                                {
                                    key === 'sub_category' && (<SubCategoriesDropdown
                                        label="sub category"
                                        name="value"
                                        defaultVal={value?.toString()}
                                        onSelectChange={() => {
                                        }}
                                        isError={errors['sub_category']}
                                        isFullWidth={false}
                                    />)
                                }
                                {
                                    key === 'brand' && (<BrandsDropdown
                                        label="Brand"
                                        name="value"
                                        defaultVal={value?.toString()}
                                        onSelectChange={(val) => {
                                            console.log('Brand selected: ', val);
                                        }}
                                        isError={errors['brand']}
                                        isFullWidth={false}
                                    />)
                                }
                                {
                                    key === 'condition' && (<ConditionsDropdown
                                        label="Condition"
                                        name="value"
                                        defaultVal={value?.toString()}
                                        onSelectChange={(val) => {
                                            console.log('Condition selected: ', val);
                                        }}
                                        isError={errors['condition']}
                                        isFullWidth={false}
                                    />)
                                }
                                {
                                    !exclude_keys.includes(key) && (
                                        <TextField
                                            name="value"
                                            label={toTitleCase(removeSpecialChars(key))}
                                            variant="outlined"
                                            size="small"
                                            defaultValue={value}
                                            multiline={key === 'description'}
                                            rows={key === 'description' ? 3 : 1}
                                            fullWidth
                                            sx={{gridColumn: '1/-1'}}
                                        />
                                    )
                                }
                                <TextField name="key" type="hidden" value={key} sx={{display: 'none'}} hidden/>
                                <TextField name="hashed_id" type="hidden" value={slug} sx={{display: 'none'}} hidden/>

                                <Button
                                    key={`${key}-edit-btn`}
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    fullWidth
                                    sx={{gridColumn: '1/-1', mt: 2}}
                                >Submit</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))
            }
            <StatusSnackbar
                open={status.open}
                onClose={handleClose}
                message='Please wait while we update your product'
                sx={{ bottom: { xs: 90, sm: 0 } }}
            />
        </Container>
    );
};

export default EditProductPage;

/*
const EditProductPage = ({params}: { params: Promise<{ slug: string, name: string, product: string }> }) => {
    const {slug} = use(params);
    console.log(`product ${slug}`);

    const searchParams = useSearchParams();
    const productParam = searchParams.get('product') || '';
    const product: Product | null = getQueryParamAsObject<Product>(productParam);

    const productEntries = product
        ? Object.entries(product).filter(([key]) =>
            !['hashed_id', 'images', 'store_id'].includes(key)
        )
        : [];

    const [enableInput, setEnableInput] = React.useState<string | false>(false);

    if (!product) {
        return (
            <Container maxWidth="sm" sx={{ pt: 5 }}>
                <p>Invalid product data</p>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ flexGrow: 1, pt: 5 }}>
            {productEntries.map(([key, value]) => (
                <List key={key} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem
                        alignItems="flex-start"
                        disablePadding
                        secondaryAction={
                            <Button
                                variant="text"
                                size="small"
                                onClick={() =>
                                    setEnableInput(enableInput === key ? false : key)
                                }
                            >
                                {enableInput === key ? 'Cancel' : 'Edit'}
                            </Button>
                        }
                    >
                        <Box
                            component="form"
                            action={handleSubmit}
                            sx={{
                                display: 'row',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 2,
                                width: '85%'
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {/!*<input type="hidden" name="slug" value={slug} />
                            <input type="hidden" name="field" value={key} />*!/}
                            <TextField
                                name="value"
                                disabled={enableInput !== key}
                                label={toTitleCase(key)}
                                variant="outlined"
                                size="small"
                                defaultValue={value}
                                fullWidth
                                sx={{
                                    gridColumn: '1/-1', width: '80%',
                                }}
                            />
                            {enableInput === key && (
                                <Button type="submit" variant="contained" size="small"
                                sx={{ width: '16%', ml: 1, py: 1 }}>
                                    Done
                                </Button>
                            )}
                        </Box>
                    </ListItem>
                </List>
            ))}
        </Container>
    );
};

export default EditProductPage;
*/


/*
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
 productEntries.map(([key, value]) => (
                    <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
                        <AccordionSummary
                            expandIcon={<Button variant="outlined" size="small" key={`${key}-toggle-btn`}>Edit</Button>}
                            aria-controls={`${key}-content`}
                            id={`${key}-header`}
                        >
                            <Typography component="span" sx={{width: '33%', flexShrink: 0}}>
                                {toTitleCase(key.replace(/_/g, ' '))}
                            </Typography>
                            <Typography component="span" sx={{color: 'text.secondary'}}>
                                {value?.toString()}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                component="form"
                                action={handleSubmit}>
<TextField
    name={key}
    type={key=== 'hashed_id' ? 'hidden' : 'text'}
    label={toTitleCase(key)}
    variant="outlined"
    size="small"
    defaultValue={value}
    fullWidth={false}
    sx={{gridColumn: '1/-1'}}
/>
<Button
    key={`${key}-edit-btn`}
    variant="outlined"
    color="primary"
    onClick={() => {
        // Handle the edit action here
        console.log(`Edit ${key}: ${value}`);
    }}
>
    Done
</Button>
</Box>
</AccordionDetails>
</Accordion>
))*/
