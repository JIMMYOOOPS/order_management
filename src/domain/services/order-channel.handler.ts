import { OrderEntity } from '../entities/order.entity';
import { OrderModel } from '../models/order/order.model';

export interface OrderChannelHandler {
  handle(model: OrderModel): OrderEntity;
}
