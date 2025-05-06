/* eslint-disable */
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel,GridActionsCellItem } from '@mui/x-data-grid';
import { Shipment, ShipmentStatus } from '@/types/shipment';
import ShipmentFilters from "@/components/ShipmentFilters";
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, Box } from '@mui/material';
import StatusBadge from './StatusBadge';
import { statusColors } from './StatusBadge';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "next-i18next.config";
import { useTranslation } from 'next-i18next';

import { useShipmentTranslations } from '@/hooks/useShipmentTranslations'

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

    const t = useShipmentTranslations()
    // console.log('Loaded translations:', JSON.stringify(t.columns,null,2));

    const columns: GridColDef<Shipment>[] = [
      { field: 'trackingNumber', headerName: t.columns.trackingNumber, width: 150 },
      { field: 'origin', headerName: t.columns.origin, width: 150 },
      { field: 'destination', headerName: t.columns.destination, width: 150 },
      { field: 'carrier', headerName: t.columns.carrier, width: 150 },
      { 
        field: 'status', 
        headerName: t.columns.status, 
        width: 150,
        renderCell: (params) => <StatusBadge status={params.value} />
      },
      { field: 'shipDate', headerName: t.columns.shipDate, width: 150 },
      { field: 'eta', headerName: t.columns.eta, width: 150 },
    ]

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
        <DialogTitle>{t.statusModal.title}</DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Box sx={{ mt: 2 }}>
              <div><strong>{t.statusModal.trackingNumber}:</strong> {selectedShipment.trackingNumber}</div>
              <div><strong>{t.statusModal.currentStatus}:</strong> <StatusBadge status={selectedShipment.status} /></div>
              
              <Box sx={{ mt: 3 }}>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                  fullWidth
                >
                  {Object.keys(statusColors).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                      {/* {t.statusOptions(status)} */}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t.statusModal.cancel}</Button>
          <Button 
            onClick={handleStatusUpdate}
            disabled={isUpdating || !newStatus || newStatus === selectedShipment?.status}
            variant="contained"
          >
            {isUpdating ? t.statusModal.updating : t.statusModal.update}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

