import { Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/order/order.model';
import { OrderChannelHandlerFactory } from './channel-handlers/order-channel.handler-factory';
import { OrderRepository } from '../../../infrastructure/database/postgres/repositories/order.repository';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { OrderQueryDto } from '../../dto/order/order-query.dto';
import { PaginatedList } from '../../../common/utils/pagination.util';
import { OrderChannelAdapterFactory } from './channel-adapters/order-channel.adapter-factory';
import { EOrderStatus, EOrderChannel } from 'src/domain/enums/order/order.enum';
import { OrderStateContext } from '../../../domain/services/order-state/order-state.context';
import { OrderPendingState } from '../../../domain/services/order-state/pending.state';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(orderModel: OrderModel): Promise<OrderEntity> {
    const handler = OrderChannelHandlerFactory.getHandler(orderModel.channel);
    const orderEntity = handler.handle(orderModel);
    const orderResponse = await this.orderRepository.create(orderEntity);
    return orderResponse;
  }

  async createByChannel(
    rawDto: any,
    channel: EOrderChannel,
  ): Promise<OrderEntity> {
    // Get the appropriate adapter for the channel
    const adapter = OrderChannelAdapterFactory.getAdapter(channel);
    // Convert the rawDto to an OrderModel
    const orderModel = adapter.transform(rawDto);
    // TODO: Save the rawDto for future reference if needed
    // Create the order using the service
    return this.create(orderModel);
  }

  async findById(id: string): Promise<OrderEntity> {
    return this.orderRepository.findById(id);
  }

  async findList(
    pagination: { page: number; limit: number },
    query: OrderQueryDto,
  ): Promise<PaginatedList<OrderEntity>> {
    const { page, limit } = pagination;
    const response = await this.orderRepository.findList(
      {
        page,
        limit,
      },
      query,
    );
    return response;
  }

  async update(id: string, params: Partial<OrderModel>): Promise<OrderEntity> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    // Process the order status update
    if (
      params.status === EOrderStatus.PROCESSING &&
      existingOrder.status === EOrderStatus.PENDING
    ) {
      const orderStateContext = new OrderStateContext(new OrderPendingState());
      // Transition the order from pending to processing
      orderStateContext.process(existingOrder);
    }
    console.log('existingOrder', existingOrder);

    const updateResponse = this.orderRepository.update(existingOrder);
    if (!updateResponse) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return updateResponse;
  }
}
