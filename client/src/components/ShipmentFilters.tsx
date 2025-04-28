// components/ShipmentFilters.tsx
import { TextField, MenuItem, Box } from '@mui/material';

const statusOptions = ['All', 'Created', 'In Transit', 'Delivered', 'Cancelled'];
const carrierOptions = ['All', 'UPS', 'FedEx', 'USPS', 'DHL'];

export default function ShipmentFilters({
  statusFilter,
  carrierFilter,
  onStatusChange,
  onCarrierChange,
}: {
  statusFilter: string;
  carrierFilter: string;
  onStatusChange: (value: string) => void;
  onCarrierChange: (value: string) => void;
}) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        select
        label="Status"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        {statusOptions.map((status) => (
          <MenuItem key={status} value={status === 'All' ? '' : status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Carrier"
        value={carrierFilter}
        onChange={(e) => onCarrierChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        {carrierOptions.map((carrier) => (
          <MenuItem key={carrier} value={carrier === 'All' ? '' : carrier}>
            {carrier}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}