declare global {
    interface Window {
        EyeDropper: new () => {
            open: () => Promise<{ sRGBHex: string }>;
        };
    }
}

import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import Grid from '@mui/material/Grid2';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Pencil icon
import ToastMessage from "@/app/components/ToastMessage";

interface Color {
    hex: string;
    rgb?: { r: number; g: number; b: number; a: number };
    hsl?: { h: number; s: number; l: number; a: number };
}

type MultiColors = {
    onColorChange: (value: string) => void;
    isError?: string | null;
    label?: string;
    defaultColors?: string[];
};

const MulticolorSelector: React.FC<MultiColors> = (props) => {
    const [selectedColors, setSelectedColors] = useState<string[]>(props.defaultColors || []);
    const [currentColor, setCurrentColor] = useState<string>('#ff0000');
    const [openPicker, setOpenPicker] = useState<boolean>(false);

    const handleColorChange = (color: Color) => {
        setCurrentColor(color.hex);
    };

    const handleAddColor = () => {
        if (selectedColors.length >= 5) {
            alert(`You can only select up to 5 colors for your product.`);
            return;
        }
        if (!selectedColors.includes(currentColor)) {
            setSelectedColors([...selectedColors, currentColor]);
        }
    };

    const handleRemoveColor = (color: string) => {
        setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    };

    const handleEyeDropperPick = async () => {
        if ('EyeDropper' in window) {
            const eyeDropper = new window.EyeDropper();
            try {
                const result = await eyeDropper.open();
                setCurrentColor(result.sRGBHex);
                handleAddColor();
            } catch (err) {
                console.warn('EyeDropper canceled or failed:', err);
            }
        } else {
            alert('Your browser does not support the color EyeDropper');
        }
    };

    const handleOpenPicker = () => setOpenPicker(true);
    const handleClosePicker = () => setOpenPicker(false);

    useEffect(() => {
        props.onColorChange(selectedColors.toString());
    }, [props.onColorChange, selectedColors]);

    return (
        <Box py={1}>
            {/* Color Picker Trigger */}
            <Box display="flex" alignItems="center">
                <Button
                    size='small'
                    variant="contained"
                    onClick={handleOpenPicker}
                    sx={{ border: '2px solid #fff', borderRadius: '8px 22px' }}
                >
                    {props.label || 'Pick Product Color'}
                </Button>
                <Tooltip title="Pick from screen">
                    <IconButton onClick={handleEyeDropperPick} sx={{ ml: 1 }}>
                        <EditIcon color='primary'/>
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Dialog for ChromePicker */}
            <Dialog
                open={openPicker}
                onClose={handleClosePicker}
                hideBackdrop={true}
                maxWidth="xs"
            >
                <DialogContent>
                    <ChromePicker color={currentColor} onChange={handleColorChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePicker} color="primary" size='small' sx={{ mr: 2 }}>
                        Close
                    </Button>
                    <Button onClick={handleAddColor} color="primary" size='small'>
                        Add Color
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Selected Colors */}
            <Box mt={1}>
                {selectedColors.length > 0 && (
                    <Typography variant="body2" gutterBottom>
                        Selected Colors:
                    </Typography>
                )}
                <Grid container spacing={1}>
                    {selectedColors.length > 0 ? (
                        selectedColors.map((color) => (
                            <Grid key={color}>
                                <Box
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        backgroundColor: color,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        border: '2px solid #fff',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                                    }}
                                    onClick={() => handleRemoveColor(color)}
                                >
                                    <Typography component='span' variant="caption" color="white">
                                        X
                                    </Typography>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <ToastMessage message={props.isError || 'No color selected'} type="error" />
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default MulticolorSelector;
