// src/domain/models/order/shipment.model.ts
import { EShipmentType } from 'src/domain/enums/shipment/shipment.enum';
import { OrderItemModel } from './order-item.model';

export interface ShipmentModel {
  shippingAddress: string;
  type: EShipmentType;
  deliveryDate?: Date;
  items: OrderItemModel[];
}
