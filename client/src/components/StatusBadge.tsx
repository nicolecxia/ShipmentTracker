// components/StatusBadge.tsx
import { Chip } from '@mui/material';
import { ShipmentStatus } from '../types/shipment';


export const statusColors: Record<ShipmentStatus, string> = {
    'Pending': 'default',
    'In Transit': 'primary',
    'Delivered': 'success',
    'Cancelled': 'warning',
  };

interface StatusBadgeProps {
  status: ShipmentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip 
      label={status} 
      color={statusColors[status] as any} 
      size="small" 
      variant="outlined"
    />
  );
}