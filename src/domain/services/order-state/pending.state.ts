import { OrderState } from './order-state.interface';
import { OrderEntity } from '../../entities/order.entity';
import { EOrderStatus } from '../../enums/order/order.enum';
import { EShipmentStatus } from '../../enums/shipment/shipment.enum';
import { OrderStateContext } from './order-state.context';
import { ProcessingState } from './processing.state';

export class OrderPendingState implements OrderState {
  process(order: OrderEntity, context: OrderStateContext): void {
    order.status = EOrderStatus.PROCESSING;
    if (order.shipments) {
      order.shipments.forEach((shipment) => {
        shipment.status = EShipmentStatus.SHIPPED;
      });
    }
    context.setState(new ProcessingState());
  }
}
