// src/domain/models/order/order.model.ts
import { EOrderChannel, EOrderStatus } from '../../enums/order/order.enum';
import { ShipmentModel } from './shipment.model';

// This model represents the Order entity in the domain layer
export interface OrderModel {
  channel: EOrderChannel;
  orderNumber?: string;
  status?: EOrderStatus;
  customerName: string;
  customerEmail: string;
  orderDate: Date;
  shipments: ShipmentModel[];
}
