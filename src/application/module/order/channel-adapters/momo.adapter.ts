import { OrderModel } from 'src/domain/models/order/order.model';
import { EOrderChannel } from 'src/domain/enums/order/order.enum';
import { OrderAdapter } from 'src/domain/services/order-channel.adapter';

export class MomoAdapter implements OrderAdapter {
  /**
   * Transforms raw Momo order data into a standardized CreateOrderDto format.
   * @param raw - The raw order data from Momo.
   * @returns A CreateOrderDto object containing the transformed order data.
   */
  transform(raw: any): OrderModel {
    // Transform the raw Momo order data into a format suitable for the application
    return {
      channel: EOrderChannel.MOMO,
      customerName: raw.customerName,
      customerEmail: raw.customerEmail,
      orderDate: raw.orderDate,
      shipments: raw.shipments.map((shipment) => ({
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
}
