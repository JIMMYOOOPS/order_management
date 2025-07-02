import { OrderModel } from '../../domain/models/order/order.model';

/**
 * OrderAdapter interface defines a contract for transforming raw order data
 * from various channels into a standardized CreateOrderDto format.
 */
interface OrderAdapter {
  /**
   * Transforms raw order data into a standardized CreateOrderDto format.
   * @param raw - The raw order data from a specific channel.
   * @returns A CreateOrderDto object containing the transformed order data.
   */
  transform(raw: any): OrderModel;
}

export { OrderAdapter };
