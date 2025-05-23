import { TextField, MenuItem, Box } from '@mui/material';
import { useId } from 'react';
import { useTranslation } from 'next-i18next'
import { useAppSelector } from '@/redux/store';

const statusOptions = ['All', 'Pending', 'In Transit', 'Delivered', 'Cancelled'];

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
  const { t } = useTranslation('common')

  const statusId = useId();
  const carrierId = useId();

    // Fetch Carriers data from Redux store
    const carriersRaw = useAppSelector((state:any) => state.carriers.data);
    const carrierOptions: string[] = ['All', ...carriersRaw.map((carrier:any) => carrier.name)];

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        select
        key="status-selector" 
        label={t('shipments.columns.status')}
        id={statusId}
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value=== 'All' ? '' : e.target.value)}
        sx={{ minWidth: 150 }}
        InputLabelProps={{ htmlFor: statusId }}
        SelectProps={{
          native: false, // Ensure we're using MUI's Select component
          id: `${statusId}-select`
        }}
      >
        {statusOptions.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        key="carrier-selector" 
        label={t('shipments.columns.carrier')}
        id={carrierId}
        value={carrierFilter}
        onChange={(e) => onCarrierChange(e.target.value=== 'All' ? '' : e.target.value)}
        sx={{ minWidth: 150 }}
        InputLabelProps={{ htmlFor: carrierId }}
        SelectProps={{
          native: false,
          id: `${carrierId}-select`
        }}
      >
        {carrierOptions.map((carrier) => (
          <MenuItem key={carrier} value={carrier}>
            {carrier}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}