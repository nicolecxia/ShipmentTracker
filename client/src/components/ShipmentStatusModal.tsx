import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Box
} from '@mui/material';
import  StatusBadge from './StatusBadge';
import { updateShipmentStatus } from '../services/shipmentService';

interface ShipmentStatusModalProps {
  open: boolean;
  onClose: () => void;
  shipmentId: number;
  currentStatus: string;
  onStatusUpdated: () => void;
}

const statusOptions: ShipmentStatus[] = [
  'Pending',
  'In Transit',
  'Delivered',
  'Cancelled'
];

export const ShipmentStatusModal = ({
  open,
  onClose,
  shipmentId,
  currentStatus,
  onStatusUpdated
}: ShipmentStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>(currentStatus as ShipmentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as ShipmentStatus);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateShipmentStatus(shipmentId, selectedStatus);
      onStatusUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Update Shipment Status</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">New Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={selectedStatus}
              label="New Status"
              onChange={handleStatusChange}
              sx={{ mb: 2 }}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  <StatusBadge status={status} size="small" />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>Current Status:</span>
            <StatusBadge status={currentStatus as ShipmentStatus} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={selectedStatus === currentStatus || isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};