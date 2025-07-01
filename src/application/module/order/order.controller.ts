import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from '../../dto/order/create-order.dto';
import { OrderService } from './order.service';
import { OrderMapper } from '../../../infrastructure/mappers/order.mapper';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const entity = OrderMapper.toEntity(dto);
    return this.orderService.create(entity);
  }
}
