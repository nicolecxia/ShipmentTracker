'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { fetchShipments, fetchShipmentCount } from '../../services/shipmentService';

const columns: GridColDef[] = [
  { field: 'trackingNumber', headerName: 'Tracking #', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'origin', headerName: 'Origin', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'estimatedDelivery', headerName: 'ETA', width: 150, type: 'date' },
];

export default function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const loadData = async () => {
    setLoading(true);
    console.log('Start loding:');
    try {
      const [data, count] = await Promise.all([
        fetchShipments({
          page: paginationModel.page + 1, // Backend is 1-based
          pageSize: paginationModel.pageSize,
        }),
        fetchShipmentCount(),
      ]);
      setShipments(data);
      setTotalCount(count);
      console.log('Total Count:', count);
      console.log('Shipments:', data);
    } catch (error) {
      console.error('Failed to load shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [paginationModel]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={shipments}
        columns={columns}
        loading={loading}
        rowCount={totalCount}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}