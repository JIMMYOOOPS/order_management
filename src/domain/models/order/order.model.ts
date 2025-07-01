// src/domain/models/order/order.model.ts
import { EOrderChannel, EOrderStatus } from '../../enums/order/order.enum';
import { ShipmentModel } from './shipment.model';

export interface OrderModel {
  channel: EOrderChannel;
  orderNumber?: string;
  status?: EOrderStatus;
  customerName: string;
  customerEmail: string;
  orderDate: Date;
  shipments: ShipmentModel[];
  createdAt: Date;
  updatedAt: Date;
}
