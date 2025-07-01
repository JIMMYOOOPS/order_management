// src/domain/models/order/shipment.model.ts
import { OrderItemModel } from './order-item.model';

export interface ShipmentModel {
  shippingAddress: string;
  deliveryDate?: Date;
  items: OrderItemModel[];
}
