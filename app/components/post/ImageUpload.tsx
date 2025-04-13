'use client';
import React, {useState} from 'react';
import {IconButton, Avatar, Box} from '@mui/material';
import ToastMessage from '../ToastMessage';
import {Close, PhotoCamera} from "@mui/icons-material";

interface ImageUploadProps {
    onFileChange: (files: File[]) => void;
    isError?: string | null;
    warningMsg?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onFileChange, isError, warningMsg}) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Handle file input change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPreviews: string[] = [];
            const newFiles: File[] = [];

            // Loop through selected files to create previews
            Array.from(files).forEach((file: File) => {
                newPreviews.push(URL.createObjectURL(file)); // Create image preview URL
                newFiles.push(file); // Store the selected files
            });

            // Update preview images and notify parent with selected files
            setImagePreviews((prev) => [...prev, ...newPreviews]);
            setSelectedFiles((prev) => [...prev, ...newFiles]);
            onFileChange([...selectedFiles, ...newFiles]); // Pass updated files to parent
        }
    };

    // Handle removing an image
    const handleRemoveImage = (index: number) => {
        const newPreviews: string[] = [...imagePreviews];
        const newFiles: File[] = [...selectedFiles];

        // Remove the preview and file at the specified index
        newPreviews.splice(index, 1);
        newFiles.splice(index, 1);

        // Update state
        setImagePreviews(newPreviews);
        setSelectedFiles(newFiles);
        onFileChange(newFiles); // Notify parent with updated files
    };

    return (
        <Box sx={{textAlign: 'center', mb: 2}}>
            {/* File upload input for multiple files */}
            <label htmlFor="image-upload">
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    multiple
                    onChange={handleImageChange}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera/>
                </IconButton>
            </label>

            {/* Display multiple image previews with remove option */}
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 2}}>
                {imagePreviews.map((preview, index) => (
                    <Box key={index} sx={{position: 'relative'}}>
                        <Avatar
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            sx={{
                                width: 100,
                                height: 100,
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                        {/* Delete button */}
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            }}
                            onClick={() => handleRemoveImage(index)}
                        >
                            <Close sx={{":hover": {color: 'rgba(249, 1, 1, 0.9)'},}}/>
                        </IconButton>
                    </Box>
                ))}
            </Box>

            {/* Display message when no images are selected */}
            {imagePreviews.length === 0 && (
                <ToastMessage key={isError} message={isError || warningMsg || 'No images selected'}/>
            )}
        </Box>
    );
};

export default ImageUpload;
