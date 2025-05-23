
export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  carrier: 'UPS' | 'FedEx' | 'USPS' | 'DHL'; // Union type for specific values
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled'; 
  shipDate: string;
  eta: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  imageId?: string;
}


export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
}


export interface ShipmentFormValues {
  origin: string;
  destination: string;
  carrier: string;
  shipDate: string;
  eta: string;
  imageId?: string;
}

export enum ShipmentStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

// status is ShipmentStatus - Not just returning boolean, but telling TypeScript:
// "If this function returns true, then status is of type ShipmentStatus"
export function isShipmentStatus(status: string): status is ShipmentStatus {
  return Object.values(ShipmentStatus).includes(status as ShipmentStatus);
}