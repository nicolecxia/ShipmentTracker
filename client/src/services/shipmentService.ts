// src/services/shipmentService.ts
import axios from 'axios';
import { console } from 'inspector';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchShipments = async (params: {
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
  return response.data;
};

export const fetchShipmentCount = async (filters?: any) => {
  const response = await axios.get(`${API_BASE_URL}/shipments/count`, {
    params: filters,
  });
  return response.data.count;
};