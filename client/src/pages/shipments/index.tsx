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
  // const [statusFilter, setStatusFilter] = useState('');
  // const [carrierFilter, setCarrierFilter] = useState('');
  const [rowCount, setRowCount] = useState(0);


 // Extract filter values from filterModel
 const getActiveFilters = () => {
  return {
    status: filterModel.items.find(item => item.field === 'status')?.value || '',
    carrier: filterModel.items.find(item => item.field === 'carrier')?.value || ''
  };
};

// 筛选变更处理（确保只有1个筛选条件）
// const handleFilterModelChange = (newModel: GridFilterModel) => {
//   if (newModel.items.length > 1) {
//     // 如果尝试设置多个筛选，则只保留最后一个
//     setFilterModel({
//       items: [newModel.items[newModel.items.length - 1]]
//     });
//   } else {
//     setFilterModel(newModel);
//   }
// };


  const loadData = async () => {
    setLoading(true);
    try{
  
      const activeFilters = getActiveFilters();
      const data = await fetchShipments({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        status: activeFilters.status,
        carrier: activeFilters.carrier
      });
      console.log('getactiveFilters:', activeFilters);

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
 // Trigger loadData when filters or pagination changes
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