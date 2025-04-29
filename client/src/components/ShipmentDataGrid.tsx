import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel,GridActionsCellItem } from '@mui/x-data-grid';
import { Shipment, ShipmentStatus } from '../types/shipment';
import ShipmentFilters from "@/components/ShipmentFilters";
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, Box } from '@mui/material';
import StatusBadge from './StatusBadge';
import { statusColors } from './StatusBadge';

const columns: GridColDef<Shipment>[] = [
  { field: 'trackingNumber', headerName: 'Tracking #', width: 150 },
  { field: 'origin', headerName: 'Origin', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'carrier', headerName: 'Carrier', width: 150 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 150,
    renderCell: (params) => <StatusBadge status={params.value} />
  },
  { field: 'shipDate', headerName: 'Ship Date', width: 150 },
  { field: 'eta', headerName: 'ETA', width: 150 },
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
  //     if (!params?.value) return 'N/A';
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
  //     // Safely handle missing/undefined/null eta
  //     if (!params.row?.eta) return null;
      
  //     try {
  //       const date = new Date(params.row.eta);
  //       return isNaN(date.getTime()) ? null : date;
  //     } catch {
  //       return null;
  //     }
  //   },
  //   valueFormatter: (params) => {
  //     if (!params.value) return 'Not set';  // Handles null/undefined
      
  //     // Format valid dates
  //     return params.value.toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric'
  //     });
  //   },
  //   cellClassName: (params) => {
  //     if (!params.value) return 'missing-date';
      
  //     // Highlight overdue dates
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     return params.value < today ? 'overdue' : '';
  //   }
  // }
];

interface ShipmentDataGridProps {
  shipments: Shipment[];
  loading: boolean;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  rowCount?: number;
  onStatusUpdate?: (trackingNumber: string, newStatus: ShipmentStatus) => Promise<void>;
}

export default function ShipmentDataGrid({
  shipments,
  loading,
  paginationModel,
  onPaginationModelChange,
  filterModel,
  onFilterModelChange,
  rowCount,
  onStatusUpdate,
}: ShipmentDataGridProps) {
  //  // State for independent filter controls
  //  const [statusFilter, setStatusFilter] = useState('');
  //  const [carrierFilter, setCarrierFilter] = useState('');

    // 独立的状态管理（与DataGrid解耦）
    const [activeFilter, setActiveFilter] = useState<{
      field: 'status' | 'carrier';
      value: string;
    } | null>(null);

 // Modal state
 const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
 const [newStatus, setNewStatus] = useState<ShipmentStatus | ''>('');
 const [isUpdating, setIsUpdating] = useState(false);

      // 同步筛选状态到DataGrid
      useEffect(() => {
        onFilterModelChange?.({
          items: activeFilter ? [{
            field: activeFilter.field,
            operator: 'equals',
            value: activeFilter.value
          }] : []
        });
      }, [activeFilter]);


     const handleRowDoubleClick = (params: { row: Shipment }) => {
    setSelectedShipment(params.row);
    setNewStatus(params.row.status);
     };
    
     const handleStatusUpdate = async () => {
      if (!selectedShipment || !newStatus || !onStatusUpdate) return;
      
      try {
        setIsUpdating(true);
        console.log('Updating status for:', selectedShipment.trackingNumber, 'to', newStatus);
        await onStatusUpdate(selectedShipment.trackingNumber, newStatus);
        
        handleClose();
      } finally {
        setIsUpdating(false);
      }
    };
  
    const handleClose = () => {
      setSelectedShipment(null);
      setNewStatus('');
    };

  return (
    <div style={{ width: '100%' }}>
    <ShipmentFilters
          statusFilter={activeFilter?.field === 'status' ? activeFilter.value : ''}
          carrierFilter={activeFilter?.field === 'carrier' ? activeFilter.value : ''}
          onStatusChange={(value) => {
            setActiveFilter(value ? { field: 'status', value } : null);
          }}
          onCarrierChange={(value) => {
            setActiveFilter(value ? { field: 'carrier', value } : null);
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
      onRowDoubleClick={handleRowDoubleClick}
    />

     {/* Status Update Modal */}
     <Dialog open={!!selectedShipment} onClose={handleClose}>
        <DialogTitle>Update Shipment Status</DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Box sx={{ mt: 2 }}>
              <div><strong>Tracking #:</strong> {selectedShipment.trackingNumber}</div>
              <div><strong>Current Status:</strong> <StatusBadge status={selectedShipment.status} /></div>
              
              <Box sx={{ mt: 3 }}>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                  fullWidth
                >
                  {Object.keys(statusColors).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleStatusUpdate}
            disabled={isUpdating || !newStatus || newStatus === selectedShipment?.status}
            variant="contained"
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}