import axios from 'axios';
import { ImageUploadDto, ImageUploadResponse } from '../types/imageTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const uploadImage = async (data: ImageUploadDto): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append('ImageFile', data.ImageFile);
    
    // Append optional fields if they exist
    if (data.Title) formData.append('Title', data.Title);
    if (data.Description) formData.append('Description', data.Description);

    console.log('FormData:', formData);

    const response = await axios.post<ImageUploadResponse>(
      `${API_BASE_URL}/images/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  
    return response.data;
  };

