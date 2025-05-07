/* eslint-disable */
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShipmentDataGrid from '../../components/ShipmentDataGrid';
import Link from 'next/link';
import { GridFilterModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { fetchCarriers } from '@/services/carrierService';
import { fetchShipments, updateShipmentStatus } from '@/services/shipmentService';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/router";
import ThemeToggle from '@/components/ThemeToggle';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '@/utils/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "next-i18next.config";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCarriers } from '@/redux/carriersSlice';

function ShipmentDashboard() {
  const router = useRouter();
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
  const [rowCount, setRowCount] = useState(0);
  const { t, i18n } = useTranslation('common');

  const dispatch = useAppDispatch();


  const { data: session, status } = useSession({ 
    required: true,
    onUnauthenticated() {
      router.push(`${window.location.origin}/auth/signin`);
    } });
    if (status === "loading") {
      return <div>Loading...</div>; // Show loading state
    }
    if (!session) {
      return null; // Brief render before redirect
    }

     // Fetch Carriers data
    useEffect(() => {
      const fetchCarriersData = async () => {  
        const response = await fetchCarriers(); 
        console.log('Carriers response:', response);
        dispatch(setCarriers(response));
      };

      fetchCarriersData();
    }, []);


    // Extract filter values from filterModel
    const getActiveFilters = () => {
      return {
        status: filterModel.items.find(item => item.field === 'status')?.value || '',
        carrier: filterModel.items.find(item => item.field === 'carrier')?.value || ''
      };
    };


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
      console.log('paginationModel:', paginationModel.page + 1);
      console.log('pageSize:', paginationModel.pageSize);

    setShipments(data);
    setTotalCount(data.total || 0);

    console.log('Total Count:', data.total || 0);
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

        <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mb: 4
      }}>
        <Box>
        <img 
          src={session.user?.image} 
          alt={session.user?.name}
          style={{ borderRadius: '50%', width: 50, height: 50 }}
        />
        <Link href="/profile" passHref>
          <Typography variant="h6">
          {t('dashboard.welcome')}, {session.user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {session.user?.email}
          </Typography>
          </Link>
        </Box>
        
        <Button 
          variant="contained"
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          sx={{ 
            ml: 'auto',
            bgcolor: 'error.main',
            '&:hover': { bgcolor: 'error.dark' }
          }}
        >
          {t('dashboard.logout')}
        </Button>
        <ThemeToggle />
        <LanguageSwitcher />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">{t('dashboard.title')}</Typography>
        <Link href="/shipments/add" passHref>
          <Button variant="contained" startIcon={<AddIcon />}>
           {t('dashboard.addShipment')}
          </Button>
        </Link>
      </Box>
      
      <ShipmentDataGrid
        shipments={shipments?.shipments || []}
        imageUrl={shipments?.imageUrl || ''}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        rowCount={shipments?.total || 0}
        onStatusUpdate={async (trackingNumber, newStatus) => {
          await updateShipmentStatus(trackingNumber, newStatus);
          loadData();
        }}
      />
    </Box>
  );
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
    },
  }
}

export default ShipmentDashboard;