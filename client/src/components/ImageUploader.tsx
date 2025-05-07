import React, { useState } from 'react';
import { Button,TextField, Box, CircularProgress, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import {ImageUploadResponse} from '../types/imageTypes';
import { uploadImage } from '../services/imageService';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<ImageUploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setSelectedFile(file);
    setUploadResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadImage({
        ImageFile: selectedFile,
        Title: title,
        Description: description
      });
      setUploadResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Image Upload
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* File Input */}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ width: 'fit-content' }}
        >
          Select Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {/* Optional Fields */}
        <TextField
          label="Title (Optional)"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <TextField
          label="Description (Optional)"
          variant="outlined"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Preview Section */}
        {selectedFile && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </Typography>
          </Box>
        )}

        {previewUrl && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }}
            />
          </Box>
        )}

        {/* Upload Button */}
        {selectedFile && !isUploading && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
            sx={{ mt: 2 }}
          >
            Upload Image
          </Button>
        )}

        {/* Loading State */}
        {isUploading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <CircularProgress size={24} />
            <Typography>Uploading...</Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Success State */}
        {uploadResult && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" color="success.dark">
              Upload Successful!
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography>Image ID: {uploadResult.imageId}</Typography>
              <Typography>Original Name: {uploadResult.metadata.originalFileName}</Typography>
              <Typography>Size: {Math.round(uploadResult.metadata.fileSize / 1024)} KB</Typography>
              {uploadResult.metadata.width && uploadResult.metadata.height && (
                <Typography>
                  Dimensions: {uploadResult.metadata.width} × {uploadResult.metadata.height} px
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ImageUploader;