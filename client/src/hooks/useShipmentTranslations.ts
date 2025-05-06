// hooks/useShipmentTranslations.ts
import { useTranslation } from 'next-i18next'

export const useShipmentTranslations = () => {
  const { t , ready} = useTranslation('common')
  

 // Fallback translations
 const fallback = {
  columns: {
    trackingNumber: 'Tracking #',
    origin: 'Origin',
    destination: 'Destination',
    carrier: 'Carrier',
    status: 'Status',
    shipDate: 'Ship Date',
    eta: 'ETA'
  },
  statusModal: {
    title: 'Shipment Status',
    trackingNumber: 'Tracking Number',
    currentStatus: 'Current Status',
    cancel: 'Cancel',
    update: 'Update',
    updating: 'Updating...'
  },
  statusOptions: {
    pending: "Pending",
    in_transit: "In Transit",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    exception: "Exception"
  }
}

  if (!ready) {
    console.warn('Translations not ready yet, using fallback')
    return fallback
  }

  return {
    columns: {
      trackingNumber: t('shipments.columns.trackingNumber'),
      origin: t('shipments.columns.origin'),
      destination: t('shipments.columns.destination'),
      carrier: t('shipments.columns.carrier'),
      status: t('shipments.columns.status'),
      shipDate: t('shipments.columns.shipDate'),
      eta: t('shipments.columns.eta')
    },
    statusModal: {
      title: t('shipments.statusModal.title'),
      trackingNumber: t('shipments.statusModal.trackingNumber'),
      currentStatus: t('shipments.statusModal.currentStatus'),
      cancel: t('shipments.statusModal.cancel'),
      update: t('shipments.statusModal.update'),
      updating: t('shipments.statusModal.updating')
    },
    statusOptions: (status: string) => t(`shipments.statusOptions.${status}`)
  }
}