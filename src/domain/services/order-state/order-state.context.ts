import { OrderState } from './order-state.interface';
import { OrderEntity } from '../../entities/order.entity';

export class OrderStateContext {
  private state: OrderState;

  constructor(initialState: OrderState) {
    this.state = initialState;
  }

  public setState(state: OrderState): void {
    this.state = state;
  }

  public getState(): OrderState {
    return this.state;
  }

  public process(order: OrderEntity): void {
    this.state.process(order, this);
  }
}
