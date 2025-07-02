import { OrderEntity } from '../entities/order.entity';
import { OrderModel } from '../models/order/order.model';

// Use the OrderChannelHandler to handle order creation logic by channel
export interface OrderChannelHandler {
  handle(model: OrderModel): OrderEntity;
}
