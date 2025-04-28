import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShipmentDataGrid from '../../components/ShipmentDataGrid';
import useSWR from 'swr';
import axios from 'axios';
import { Shipment } from '../../types/shipment';
import Link from 'next/link';
import { GridFilterModel } from '@mui/x-data-grid';


const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function ShipmentDashboard() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const { data, error, isLoading } = useSWR<{ shipments: Shipment[]; total: number }>(
    `/api/shipments?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`,
    fetcher
  );

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
        shipments={data?.shipments || []}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        rowCount={data?.total || 0}
      />
    </Box>
  );
}