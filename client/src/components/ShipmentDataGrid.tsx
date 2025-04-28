import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { Shipment } from '../types/shipment';

const columns: GridColDef<Shipment>[] = [
  { field: 'trackingNumber', headerName: 'Tracking #', width: 150 },
  { field: 'origin', headerName: 'Origin', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'carrier', headerName: 'Carrier', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'shipDate', headerName: 'Ship Date', width: 150, type: 'date' },
  { field: 'eta', headerName: 'ETA', width: 150, type: 'date' },
];

interface ShipmentDataGridProps {
  shipments: Shipment[];
  loading: boolean;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  rowCount?: number;
}

export default function ShipmentDataGrid({
  shipments,
  loading,
  paginationModel,
  onPaginationModelChange,
  filterModel,
  onFilterModelChange,
  rowCount,
}: ShipmentDataGridProps) {
  return (
    <DataGrid
      rows={shipments}
      columns={columns}
      loading={loading}
      paginationMode="server"
      filterMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      filterModel={filterModel}
      onFilterModelChange={onFilterModelChange}
      rowCount={rowCount}
      pageSizeOptions={[5, 10, 25]}
      disableRowSelectionOnClick
    />
  );
}