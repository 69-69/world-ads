import React, {useEffect, useState} from 'react';
import {ChromePicker} from 'react-color';
import Grid from '@mui/material/Grid2';
import {Box, Button, Typography, Dialog, DialogActions, DialogContent} from '@mui/material';
import ToastMessage from "@/app/components/ToastMessage";

interface Color {
    hex: string;
    rgb?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    hsl?: {
        h: number;
        s: number;
        l: number;
        a: number;
    };
}

type MultiColors = {
    onColorChange: (value: string) => void,
    isError?: string | null,
};

// MulticolorSelector component
const MulticolorSelector: React.FC<MultiColors> = ({onColorChange, isError}) => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [currentColor, setCurrentColor] = useState<string>('#000000');
    const [openPicker, setOpenPicker] = useState<boolean>(false);

    // Handle color change in the color picker
    const handleColorChange = (color: Color) => {
        setCurrentColor(color.hex);
    };

    // Add the current color to the selected colors
    const handleAddColor = () => {
        if (selectedColors.length >= 5) {
            alert(`You can only select up to 5 colors for your product.`);
            return;
        }

        // Only add the color if it doesn't already exist in the selected colors
        if (!selectedColors.includes(currentColor)) {
            setSelectedColors([...selectedColors, currentColor]);
        }
    };

    // Remove color from selected colors
    const handleRemoveColor = (color: string) => {
        setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    };

    // Toggle color picker dialog
    const handleOpenPicker = () => setOpenPicker(true);
    const handleClosePicker = () => setOpenPicker(false);

    // Update the parent component whenever selected colors change
    useEffect(() => {
        onColorChange(selectedColors.toString());
    }, [selectedColors]);

    return (
        <Box py={1}>
            {/* Button to open the color picker dialog */}
            <Button variant="contained" size='small' color="primary" onClick={handleOpenPicker} fullWidth>
                Pick Product Colors
            </Button>

            {/* Dialog for ChromePicker */}
            <Dialog open={openPicker} onClose={handleClosePicker}>
                <DialogContent>
                    <ChromePicker color={currentColor} onChange={handleColorChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePicker} color="primary" size='small' sx={{mr: 2}}>
                        Close
                    </Button>
                    <Button onClick={handleAddColor} color="primary" size='small'>
                        Add Color
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Selected colors */}
            <Box mt={1}>
                {selectedColors.length > 0 && <Typography variant="body2" gutterBottom>Selected Colors:</Typography>}
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
                                            textAlign: 'center',
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
                        )
                        : (<ToastMessage message={isError || 'No colors selected'} type="error"/>)
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default MulticolorSelector;


/*import React, { useState } from 'react';

// Define the available color options
const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
];

const MulticolorSelector: React.FC = () => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    // Handle color selection
    const handleColorChange = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((selectedColor) => selectedColor !== color)
                : [...prev, color]
        );
    };

    return (
        <div>
            <h2>Select Colors for Your Product</h2>
            <div>
                {colorOptions.map((color) => (
                    <div key={color.value}>
                        <label>
                            <input
                                type="checkbox"
                                value={color.value}
                                checked={selectedColors.includes(color.value)}
                                onChange={() => handleColorChange(color.value)}
                            />
                            {color.label}
                        </label>
                    </div>
                ))}
            </div>


            <div style={{ marginTop: '20px' }}>
                <h3>Selected Colors:</h3>
                <div>
                    {selectedColors.length > 0 ? (
                        selectedColors.map((color) => (
                            <span
                                key={color}
                                style={{
                                    display: 'inline-block',
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: color,
                                    margin: '5px',
                                    borderRadius: '50%',
                                }}
                            ></span>
                        ))
                    ) : (
                        <p>No colors selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MulticolorSelector;*/

