import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShipmentDataGrid from '../../components/ShipmentDataGrid';
import useSWR from 'swr';
import axios from 'axios';
import { Shipment } from '../../types/shipment';
import Link from 'next/link';
import { GridFilterModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { fetchShipments, fetchShipmentCount } from '../../services/shipmentService';


export default function ShipmentDashboard() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');
  const [rowCount, setRowCount] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try{
  // Convert filterModel to API params
  const filters = {
  status: filterModel.items.find(item => item.field === 'status')?.value,
  carrier: filterModel.items.find(item => item.field === 'carrier')?.value,
  page: paginationModel.page + 1,
  pageSize: paginationModel.pageSize
 };

    const data = await fetchShipments(filters);
      
    setShipments(data);

    const count = await fetchShipmentCount();
    setTotalCount(count);
    console.log('Total Count:', count);
    console.log('Shipments:', data);
   }catch (error) {
    console.error('Error fetching shipments:', error);
    setShipments([]);
    setTotalCount(0);
  } finally {
    setLoading(false);
  }
};

// Prevents excessive API calls while typing,300ms delay before sending the request
    useEffect(() => {
      const timer = setTimeout(() => {
        loadData();
      }, 300);
      
      return () => clearTimeout(timer);
    }, [filterModel, paginationModel]);
  

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Shipment Dashboard</Typography>
        <Link href="/shipments/add" passHref>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Shipment
          </Button>
        </Link>
      </Box>
      
      <ShipmentDataGrid
        shipments={shipments?.shipments || []}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        rowCount={shipments?.total || 0}
      />
    </Box>
  );
}