// src/services/shipmentService.ts
import axios from 'axios';
import { console } from 'inspector';
import { Shipment } from '../types/shipment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface Shipment {
//     id: number;
//     trackingNumber: string;
//     origin: string;
//     destination: string;
//     carrier: string;
//     status: string;
//     shipDate: string;  // From API as string
//     eta: string;      // From API as string
//   }

export const fetchShipments = async (params: {
    status?: string;
    carrier?: string;
    page: number;
  pageSize: number;
  filters?: any;
}) => {
  const response = await axios.get(`${API_BASE_URL}/shipments`, {
    params: {
      page: params.page,
      limit: params.pageSize,
      ...params.filters,
    },
  });

//       const transformedData = response.data.shipments.map((shipment: Shipment) => ({
//         ...shipment,
//         shipDate: shipment.shipDate ||'', 
//         eta: shipment.eta||''            
//       }));  

//   return response.data;

 // 数据清洗 + 类型安全转换
 const shipments = (response.data.shipments || []).map((item: any) => ({
    ...item,
    shipDate: typeof item.shipDate === 'string' ? item.shipDate : '',
    eta: typeof item.eta === 'string' ? item.eta : '',
    // 确保其他必填字段存在
    id: item.id || '',
    trackingNumber: item.trackingNumber || '',
    origin: item.origin || '',
    destination: item.destination || '',
    carrier: item.carrier || '',
    status: item.status || 'Created',
  }));

  return {
    shipments,
    total: response.data.total || 0,
    page: response.data.page || 1,
    pageSize: response.data.pageSize || 10,
  };
};

export const fetchShipmentCount = async (filters?: any) => {
  const response = await axios.get(`${API_BASE_URL}/shipments/count`, {
    params: filters,
  });
  return response.data.count;
};