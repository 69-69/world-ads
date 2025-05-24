'use client';

import React from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from "@mui/material/Container";
import {Box} from "@mui/material";

import PostForm from '@/app/components/post/PostForm';
import createProduct from '@/app/actions/admin/createProduct';
import alternativeCreateProduct from "@/app/actions/admin/alternativeCreateProduct";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel({children, value, index, ...other}: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-panel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab-panel-${index}`,
    };
}

const fields = [
    {name: 'name', label: 'Name', fullWidth: false},
    {name: 'stock_level', label: 'Stock Level', fullWidth: false},
    {name: 'regular_price', label: 'Regular Price', fullWidth: false},
    {name: 'sales_price', label: 'Sales Price', fullWidth: false},
    {name: 'description', label: 'Description', isTextArea: true, fullWidth: true},
];

const tabConfigs = [
    {
        title: 'Post Listing 1',
        btnText: 'Create Product',
        onSubmit: createProduct
    },
    {
        title: 'Post Listing 2',
        btnText: 'Create',
        onSubmit: alternativeCreateProduct
    }
];

const CreatePage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 5}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="product creation tabs" centered>
                    {tabConfigs.map((tab, index) => (
                        <Tab key={index} label={tab.title} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>

            {tabConfigs.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <PostForm
                        title={tab.title}
                        fields={fields}
                        buttonText={tab.btnText}
                        onSubmit={tab.onSubmit}
                    />
                </CustomTabPanel>
            ))}
        </Container>
    );
};

export default CreatePage;
