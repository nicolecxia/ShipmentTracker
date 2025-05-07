/* eslint-disable */
import axios from 'axios';
import { Shipment, ShipmentFormValues } from '../types/shipment.ts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchShipments = async (params: {
    status?: string;
    carrier?: string;
    page: number;
  pageSize: number;
}) => {
  const response = await axios.get(`${API_BASE_URL}/shipments`, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      ...(params.status && { status: params.status }),
      ...(params.carrier && { carrier: params.carrier })
    },
  });

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
    imageId: item.imageId || null //add imageId
  }));

  return {
    shipments,
    total: response.data.total || 0,
    page: response.data.page || 1,
    pageSize: response.data.pageSize || 10,
  };
};



export const createShipment = async (shipmentData: ShipmentFormValues) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shipments`, shipmentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data; // Returns the created shipment object
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle API error responses
      throw new Error(error.response?.data?.title || 'Failed to create shipment');
    }
    throw new Error('Network error occurred');
  }
};


export const updateShipmentStatus = async (trackingNumber: string, status: string) => {
  const response = await axios.put(
    `${API_BASE_URL}/shipments/${trackingNumber}/status`,
    { status },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
};
