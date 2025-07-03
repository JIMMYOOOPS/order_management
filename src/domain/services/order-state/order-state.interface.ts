import { OrderEntity } from '../../entities/order.entity';
import { OrderStateContext } from './order-state.context';

export interface OrderState {
  process(order: OrderEntity, context: OrderStateContext): void;
}
