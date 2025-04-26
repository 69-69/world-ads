'use client';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button, Chip,
    Container, ImageList, ImageListItem,
    ImageListItemBar,
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
import MulticolorSelector from "@/app/components/post/MulticolorSelector";
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import {BACKEND_MARKETPLACE_IMAGE_PATH} from "@/env_config";
import {ChangeCircle} from "@mui/icons-material";


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

const exclude_this = ['hashed_id', 'store_id', 'is_promo', 'published', 'slug', 'images'];
const not_textFields = ['condition', 'brand', 'sub_category', 'product_colors', 'category'];

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
    const [status, setStatus] = useState<{ open: boolean, msg?: string }>({open: false});
    const [productColors, setProductColors] = useState<string>(product?.product_colors || '');

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
            <Container maxWidth="sm" sx={{pt: 5}}>
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

    const showChip = (value: string) =>
        value?.split(',').map((color, index) => (
            <Chip key={index} sx={{background: color.trim(), width: 20, height: 20, mx: 1}}/>
        ));

    const handleProductColors = (colors: string) => {

        setProductColors(colors);
    };
    const imgPath = `${BACKEND_MARKETPLACE_IMAGE_PATH}/resize/`;


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
                         autoComplete="off" mt={1}>
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
                                    {key !== 'product_colors' && toTitleCase(value?.toString() ?? '')}

                                    {key === 'product_colors' && showChip(value?.toString() || '')}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    !not_textFields.includes(key) && (
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
                                    key === 'product_colors' && (
                                        <>
                                            <TextField
                                                name="value"
                                                type="hidden"
                                                value={productColors}
                                                sx={{display: 'none'}}
                                                hidden
                                            />
                                            <MulticolorSelector onColorChange={handleProductColors}/>
                                        </>
                                    )
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
                                >Save changes</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))
            }
            <Box sx={{my: 2}}>
                {
                    product.images && (
                        <ImageList variant="masonry" cols={4} gap={8}>
                            {product.images.map((image, index) => (
                                <ImageListItem key={image.trim()}>
                                    <Image
                                        src={imgPath + image.trim()}
                                        alt={image.trim()}
                                        width={200}
                                        height={200}
                                        loading="lazy"
                                        style={{borderRadius: '8px'}}
                                    />
                                    <ImageListItemBar
                                        sx={{background: 'transparent'}}
                                        position="top"
                                        actionIcon={
                                            <IconButton aria-label={`star ${index}`}
                                                        sx={{backgroundColor: 'rgba(5,5,5,0.6)'}}>
                                                <ChangeCircle color="secondary"
                                                              sx={{":hover": {color: 'rgba(249, 1, 1, 0.9)'}}}/>
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                    />
                                </ImageListItem>
                            )) || ''}

                        </ImageList>
                    )
                }
            </Box>
            <StatusSnackbar
                open={status.open}
                onClose={handleClose}
                message='Please wait while we update your product'
                sx={{bottom: {xs: 90, sm: 0}}}
            />
        </Container>
    );
};

export default EditProductPage;
