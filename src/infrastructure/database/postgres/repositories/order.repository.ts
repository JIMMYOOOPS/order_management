import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { OrderModel } from 'src/domain/models/order/order.model';

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
    // Get shipment and order items eagerly loaded
    // This assumes that the OrderEntity has relations defined for shipments and items
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['shipments', 'shipments.items'],
    });
    return order || null;
  }

  async findList(pagination: { page: number; limit: number }): Promise<{
    items: OrderEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page, limit } = pagination;
    // implement pagination logic whilst running the query
    const [items, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
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

  async update(id: string, params: Partial<OrderModel>): Promise<OrderEntity> {
    // Find the order by ID
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    // Update the order with the provided parameters
    Object.assign(order, params);
    // Save the updated order back to the database
    const updatedOrder = await this.orderRepository.save(order);
    // Return the updated order with its relations loaded
    return this.orderRepository.findOne({
      where: { id: updatedOrder.id },
      relations: ['shipments', 'shipments.items'],
    });
  }
}
