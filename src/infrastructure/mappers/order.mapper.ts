import { UpdateOrderDto } from 'src/application/dto/order/update-order.dto';
import { CreateOrderDto } from '../../application/dto/order/create-order.dto';
import { OrderModel } from '../../domain/models/order/order.model';

export class OrderMapper {
  static toModel(dto: CreateOrderDto): OrderModel {
    return {
      channel: dto.channel,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      orderDate: new Date(dto.orderDate),
      shipments: dto.shipments.map((shipment) => ({
        shippingAddress: shipment.shippingAddress,
        deliveryDate: shipment.deliveryDate
          ? new Date(shipment.deliveryDate)
          : undefined,
        type: shipment.type,
        items: shipment.items.map((item) => ({
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      })),
    };
  }

  static toPartialModel(dto: UpdateOrderDto): Partial<OrderModel> {
    return {
      status: dto.status,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      shipments: dto.shipments?.map((shipment) => ({
        shippingAddress: shipment.shippingAddress,
        deliveryDate: shipment.deliveryDate
          ? new Date(shipment.deliveryDate)
          : undefined,
        type: shipment.type,
        items: undefined, // Items are not updated in this DTO
      })),
    };
  }
}
