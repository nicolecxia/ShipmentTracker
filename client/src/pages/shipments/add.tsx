import { use, useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import axios from 'axios';
import { createShipment } from '@/services/shipmentService';
import { ShipmentFormValues } from '@/types/shipment';
import { useTranslation } from 'next-i18next'
import ImageUploader from '@/components/ImageUploader';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';

export default function AddShipment() {
  const router = useRouter();
  const [formData, setFormData] = useState<ShipmentFormValues>({} as ShipmentFormValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t, i18n } = useTranslation('common');
  
  // Fetch Carriers data from Redux store
  const carriersRaw = useAppSelector((state:any) => state.carriers.data);
  const carriers: string[] = carriersRaw.map((carrier:any) => carrier.name);

  //For image id
  const [imageId, setImageId] = useState('');
    // Callback function to receive imageId from child
    const handleImageUpload = (uploadedImageId:string) => {
      console.log('Received image ID:', uploadedImageId);
      setImageId(uploadedImageId);
    }; 

    useEffect(() => {
      // Update formData with imageId when it changes
      setFormData((prevData) => ({ ...prevData, imageId }));
    }, [imageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      const requiredFields = ['origin', 'destination', 'carrier', 'shipDate', 'eta'];
      const newErrors: Record<string, string> = {};
      requiredFields.forEach((field) => {
        if (!formData[field as keyof ShipmentFormValues]) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({}); // Clear previous errors

      console.log('Form Data:', formData);

      await createShipment(formData);
      router.push('/shipments');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Add New Shipment</Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label={t('shipments.columns.origin')}
          fullWidth
          margin="normal"
          value={formData.origin}
          onChange={(e) => setFormData({...formData, origin: e.target.value})}
          error={!!errors.origin}
          helperText={errors.origin}
        />
        
        <TextField
          label={t('shipments.columns.destination')}
          fullWidth
          margin="normal"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          error={!!errors.destination}
          helperText={errors.destination}
        />
        
        <TextField
          select
          label={t('shipments.columns.carrier')}
          fullWidth
          margin="normal"
          value={formData.carrier}
          onChange={(e) => setFormData({...formData, carrier: e.target.value})}
          error={!!errors.carrier}
          helperText={errors.carrier}
        >
          {carriers.map((carrier) => (
            <MenuItem key={carrier} value={carrier}>
              {carrier}
            </MenuItem>
          ))}
        </TextField>
        
        <DatePicker
          label={t('shipments.columns.shipDate')}
          //  value = null
          onChange={(newValue) => setFormData({...formData, shipDate: newValue? newValue.toISOString().split('T')[0]:''})}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
        
        <DatePicker
          label={t('shipments.Estimated_Arrival_(ETA)')}
          // value={formData.eta}
          onChange={(newValue) => setFormData({...formData, eta: newValue? newValue.toISOString().split('T')[0]:''})}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />

        <ImageUploader onUploadComplete={handleImageUpload} />
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={() => router.push('/shipments')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save Shipment
          </Button>
        </Box>
      </form>
    </Box>
  );
}