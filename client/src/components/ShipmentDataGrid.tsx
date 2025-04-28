import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { Shipment } from '../types/shipment';
import ShipmentFilters from "@/components/ShipmentFilters";


const columns: GridColDef<Shipment>[] = [
  { field: 'trackingNumber', headerName: 'Tracking #', width: 150 },
  { field: 'origin', headerName: 'Origin', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'carrier', headerName: 'Carrier', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  // { field: 'shipDate', headerName: 'Ship Date', width: 150, type: 'date' },
  // { field: 'eta', headerName: 'ETA', width: 150, type: 'date' },
  // { 
  //   field: 'shipDate', 
  //   headerName: 'Ship Date', 
  //   width: 150, 
  //   type: 'date',
  //   valueGetter: (params) => {
  //     const dateString = params.row?.shipDate;
  //     if (!dateString || typeof dateString !== 'string') return null;
      
  //     const date = new Date(dateString);
  //     return isNaN(date.getTime()) ? null : date;
  //   },
  //   valueFormatter: (params) => {
  //     // Format the date for display
  //     return params.value?.toLocaleDateString() || 'Invalid date';
  //   }
  // },
  // { 
  //   field: 'eta', 
  //   headerName: 'ETA', 
  //   width: 150, 
  //   type: 'date',
  //   valueGetter: (params) => {
  //     const date = new Date(params.row.eta);
  //     return isNaN(date.getTime()) ? null : date;
  //   },
  //   valueFormatter: (params) => {
  //     const date = params.value;
  //     if (!date) return 'Invalid date';
      
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
      
  //     // Add "Overdue" indicator for past dates
  //     return date < today 
  //       ? `${date.toLocaleDateString()} (Overdue)`
  //       : date.toLocaleDateString();
  //   },
  //   cellClassName: (params) => {
  //     if (!params.value) return '';
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     return params.value < today ? 'overdue' : '';
  //   }
  // },
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
    <div style={{ height: 600, width: '100%' }}>
      <ShipmentFilters
        statusFilter={filterModel?.items[0]?.value || ''}
        carrierFilter={filterModel?.items[1]?.value || ''}
        onStatusChange={(value) => {
          const newFilterModel = {
            ...filterModel,
            items: [
              { field: 'status', operator: 'equals', value },
              ...(filterModel?.items.slice(1) || []),
            ],
          };
          onFilterModelChange?.(newFilterModel);
        }}
        onCarrierChange={(value) => {
          const newFilterModel = {
            ...filterModel,
            items: [
              ...(filterModel?.items.slice(0, 1) || []),
              { field: 'carrier', operator: 'equals', value },
            ],
          };
          onFilterModelChange?.(newFilterModel);
        }}
      />
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
    </div>
  );
}