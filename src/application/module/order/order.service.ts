import { Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/order/order.model';
import { OrderChannelFactory } from './channel-handlers/order-channel.factory';
import { OrderRepository } from '../../../infrastructure/database/postgres/repositories/order.repository';
import { OrderEntity } from '../../../domain/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(orderModel: OrderModel): Promise<OrderEntity> {
    // Use the OrderChannelHandler to handle order creation logic by channel
    const handler = OrderChannelFactory.getHandler(orderModel.channel);
    const orderEntity = handler.handle(orderModel);
    // Save the order entity using the repository
    const orderResponse = await this.orderRepository.create(orderEntity);
    return orderResponse;
  }

  async findById(id: string): Promise<OrderEntity> {
    // Find an order by its ID using the repository
    return this.orderRepository.findById(id);
  }

  async findList(pagination: { page: number; limit: number }): Promise<{
    items: OrderEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Find all orders with pagination
    const { page, limit } = pagination;
    const response = await this.orderRepository.findList({
      page,
      limit,
    });

    // Return paginated response
    return response;
  }

  update(id: string, params: Partial<OrderModel>): Promise<OrderEntity> {
    return this.orderRepository.update(id, params);
  }
}
