import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { DEFAULT_PAGINATION } from '../../../common/constants/constants';
import { CreateOrderDto } from '../../dto/order/create-order.dto';
import { UpdateOrderDto } from '../../dto/order/update-order.dto';
import { OrderService } from './order.service';
import { OrderMapper } from '../../../infrastructure/mappers/order.mapper';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const orderModel = OrderMapper.toModel(dto);
    return this.orderService.create(orderModel);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  // This endpoint can be used to retrieve all orders paginated or filtered
  @Get()
  async findList(
    @Query('page') page: number = DEFAULT_PAGINATION.page,
    @Query('limit') limit: number = DEFAULT_PAGINATION.limit,
  ) {
    return this.orderService.findList({ page, limit });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    const orderModel = OrderMapper.toPartialModel(dto);
    return this.orderService.update(id, orderModel);
  }
}
