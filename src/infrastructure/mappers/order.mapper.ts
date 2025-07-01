import { CreateOrderDto } from '../../application/dto/order/create-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { ShipmentEntity } from '../../domain/entities/shipment.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';

export class OrderMapper {
  static toEntity(dto: CreateOrderDto): OrderEntity {
    const order = new OrderEntity();
    order.channel = dto.channel;
    order.orderNumber = dto.orderNumber;
    order.customerName = dto.customerName;
    order.customerEmail = dto.customerEmail;
    order.orderDate = new Date(dto.orderDate);
    order.shipments =
      dto.shipments?.map((shipmentDto) => {
        const shipment = new ShipmentEntity();
        shipment.shipmentNumber = shipmentDto.shipmentNumber;
        shipment.shippingAddress = shipmentDto.shippingAddress;
        shipment.deliveryDate = shipmentDto.deliveryDate
          ? new Date(shipmentDto.deliveryDate)
          : undefined;
        shipment.status = shipmentDto.status;
        shipment.items =
          shipmentDto.items?.map((itemDto) => {
            const item = new OrderItemEntity();
            item.sku = itemDto.sku;
            item.name = itemDto.name;
            item.quantity = itemDto.quantity;
            item.price = itemDto.price;
            return item;
          }) || [];
        return shipment;
      }) || [];
    return order;
  }
}
