export interface IOrder {
  orderCompletionStatus?: number;
  fromDepotName?: string;
  toDealerName?: string;
  assignedToTransporterId?: number;
  assignedToTransporterName?: string;
  isAssigned: boolean;
  isAccepted: boolean;
  acceptedAt: string;
  assignedAt: string;
  depotToTransporter: boolean;
  transporterToDealer: boolean;
  dealerToTransporter: boolean;
  transporterToDepot: boolean;
  depotToTransporterConfirmed?: boolean;
  transporterToDealerConfirmed?: boolean;
  dealerToTransporterConfirmed?: boolean;
  transporterToDepotConfirmed?: boolean;
  depotToTransporterConfirmedAt?: string;
  transporterToDealerConfirmedAt?: string;
  dealerToTransporterConfirmedAt?: string;
  transporterToDepotConfirmedAt?: string;
  fromDepotId: number;
  toDealerId: number;
  orderId: number;
  orderQuantities: {
    canisterBrandName: string;
    canisterSizeId: number;
    canisterSizeName: string;
    value: number;
    quantity: number;
  }[];
  canisterSizeName: string;
}
