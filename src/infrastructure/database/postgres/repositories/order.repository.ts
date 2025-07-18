import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { OrderModel } from 'src/domain/models/order/order.model';
import { OrderQueryDto } from 'src/application/dto/order/order-query.dto';
import { buildOrderFilter } from 'src/infrastructure/database/postgres/utils/order-query.util';
import { getPagination, PaginatedList } from 'src/common/utils/pagination.util';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(orderModel: OrderModel): Promise<OrderEntity> {
    const orderEntity = this.orderRepository.create(orderModel);
    // Save the order entity to the database
    const savedOrder = await this.orderRepository.save(orderEntity);
    // Ensure the order is returned with its relations loaded
    const order = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['shipments', 'shipments.items'],
    });
    if (!order) {
      throw new Error('Order not found after creation');
    }
    return order;
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['shipments', 'shipments.items'],
    });
    return order || null;
  }

  async findList(
    pagination: { page: number; limit: number },
    query: OrderQueryDto,
  ): Promise<PaginatedList<OrderEntity>> {
    const { page, limit } = pagination;
    const { skip, take } = getPagination(page, limit);
    const where = buildOrderFilter(query);
    // Apply filters based on the query parameters
    const [items, total] = await this.orderRepository.findAndCount({
      skip,
      take,
      where,
      relations: ['shipments', 'shipments.items'],
      order: { createdAt: 'DESC' }, // optional: order by createdAt desc
    });

    return {
      items,
      total,
      page: pagination.page,
      limit: pagination.limit,
    };
  }

  async update(updatedOrder: OrderEntity): Promise<OrderEntity> {
    // Save the updated order back to the database
    const response = await this.orderRepository.save(updatedOrder);
    // Return the updated order with its relations loaded
    return this.orderRepository.findOne({
      where: { id: response.id },
      relations: ['shipments', 'shipments.items'],
    });
  }
}
