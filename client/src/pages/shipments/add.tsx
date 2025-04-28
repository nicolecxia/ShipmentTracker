import { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import axios from 'axios';

const carriers = ['UPS', 'FedEx', 'USPS', 'DHL'];

export default function AddShipment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    carrier: '',
    shipDate: null,
    eta: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/shipments', formData);
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
          label="Origin"
          fullWidth
          margin="normal"
          value={formData.origin}
          onChange={(e) => setFormData({...formData, origin: e.target.value})}
          error={!!errors.origin}
          helperText={errors.origin}
        />
        
        <TextField
          label="Destination"
          fullWidth
          margin="normal"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          error={!!errors.destination}
          helperText={errors.destination}
        />
        
        <TextField
          select
          label="Carrier"
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
          label="Ship Date"
          value={formData.shipDate}
          onChange={(newValue) => setFormData({...formData, shipDate: newValue})}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
        
        <DatePicker
          label="Estimated Arrival (ETA)"
          value={formData.eta}
          onChange={(newValue) => setFormData({...formData, eta: newValue})}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
        
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