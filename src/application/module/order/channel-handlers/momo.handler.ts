import { OrderChannelHandler } from '../../../../domain/services/order-channel.handler';
import { OrderEntity } from '../../../../domain/entities/order.entity';
import { OrderModel } from '../../../../domain/models/order/order.model';
import {
  EOrderChannel,
  EOrderStatus,
} from '../../../../domain/enums/order/order.enum';
import { ShipmentEntity } from '../../../../domain/entities/shipment.entity';
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity';
import { EShipmentStatus } from 'src/domain/enums/shipment/shipment.enum';

export class MomoHandler implements OrderChannelHandler {
  handle(model: OrderModel): OrderEntity {
    // Implement the logic specific to handling Amazon orders
    const order = new OrderEntity();
    // Set the order number
    const orderNumber = this.createOrderNumber(model.channel);
    // Set the initial status for the order
    const status = EOrderStatus.PENDING;
    // Set the initial status for shipments
    const shipmentStatus = EShipmentStatus.PENDING; // Assuming Momo uses the same status
    // Generate a unique shipment number
    const shipmentNumber = this.createShipmentNumber();
    // Map the model to the entity
    order.channel = model.channel;
    order.orderNumber = orderNumber;
    order.status = status;
    order.customerName = model.customerName;
    order.customerEmail = model.customerEmail;
    order.orderDate = model.orderDate;
    order.shipments = model.shipments.map((shipment) => {
      const shipmentEntity = new ShipmentEntity();
      shipmentEntity.shipmentNumber = shipmentNumber;
      shipmentEntity.shippingAddress = shipment.shippingAddress;
      shipmentEntity.deliveryDate = shipment.deliveryDate
        ? new Date(shipment.deliveryDate)
        : undefined;
      shipmentEntity.status = shipmentStatus;
      shipmentEntity.items = shipment.items.map((item) => {
        const itemEntity = new OrderItemEntity();
        itemEntity.sku = item.sku;
        itemEntity.name = item.name;
        itemEntity.quantity = item.quantity;
        itemEntity.price = item.price;
        return itemEntity;
      });
      return shipmentEntity;
    });
    return order;
  }

  createOrderNumber(channel: EOrderChannel): string {
    // Generate a unique order number based on the channel
    const timestamp = new Date().getTime();
    return `${channel}-${timestamp}`;
  }

  createShipmentNumber(): string {
    // Generate a unique shipment number
    const timestamp = new Date().getTime();
    return `SHIP-${timestamp}`;
  }
}
