import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';

interface Shipment {
  id: number;
  trackingNumber: string;
  origin: string;
  destination: string;
  carrier: string;
  status: string;
  shipDate: string;
  eta: string;
}

export default function DashboardDB() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef<Shipment>[] = [
    { field: 'trackingNumber', headerName: 'Tracking #', width: 150 },
    { field: 'origin', headerName: 'Origin', width: 150 },
    { field: 'destination', headerName: 'Destination', width: 150 },
    { field: 'carrier', headerName: 'Carrier', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellClassName: (params) => {
        return params.value === 'Delivered' ? 'delivered-status' : 'transit-status';
      }
    },
    { 
      field: 'shipDate', 
      headerName: 'Ship Date', 
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { 
      field: 'eta', 
      headerName: 'ETA', 
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
  ];

  // Simulate fetching data from your API
  const fetchShipments = async () => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch(`http://localhost:5251/api/shipments`);
      const data = await response.json();
      
      setShipments(data.shipments);
      setTotalCount(data.total);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [paginationModel]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={shipments}
        columns={columns}
        loading={loading}
        rowCount={totalCount}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
      />
    </div>
  );
}