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

// const fetcher = (url: string) => axios.get(url).then(res => res.data);

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

  const loadData = async () => {
    setLoading(true);
    const data = await fetchShipments({
    page: paginationModel.page + 1, // Backend is 1-based
    pageSize: paginationModel.pageSize,
  });
      
    setShipments(data);

    const count = await fetchShipmentCount();
    setTotalCount(count);
    console.log('Total Count:', count);
    console.log('Shipments:', data);
    setLoading(false);
    };

    useEffect(() => {
      loadData();
    }, []);

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