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
import { OrderQueryDto } from '../../dto/order/order-query.dto';
import { OrderService } from './order.service';
import { OrderMapper } from '../../../infrastructure/mappers/order.mapper';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { EOrderChannel, EOrderStatus } from 'src/domain/enums/order/order.enum';
import { OrderListResponseDto } from '../../dto/order/get-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedOrderEntityDto {
  @ApiProperty({ type: [OrderEntity] })
  items: OrderEntity[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create a new order
   * @param dto - Data Transfer Object for creating an order
   * @returns Created order
   **/
  @ApiOperation({
    summary: 'Create a new order',
    description:
      'This endpoint allows you to create a new order in the system.',
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Data required to create a new order',
  })
  @ApiResponse({
    status: 201,
    type: OrderEntity,
    description: 'The order has been successfully created.',
  })
  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    const orderModel = OrderMapper.toModel(dto);
    return this.orderService.create(orderModel);
  }

  @Post(':channel')
  async createByChannel(
    @Param('channel') channel: EOrderChannel,
    @Body() dto: any, // TODO: The raw DTO type should be replaced by the specific DTO according to the channel
  ): Promise<OrderEntity> {
    return this.orderService.createByChannel(dto, channel);
  }

  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Retrieve an order by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    type: OrderEntity,
    description: 'The order has been successfully retrieved.',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  // This endpoint can be used to retrieve all orders paginated or filtered
  @Get()
  @ApiOperation({
    summary: 'Get a list of orders',
    description:
      'Retrieve a paginated list of orders with optional filters for status, channel, customer name, and email.',
  })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of orders.',
    type: OrderListResponseDto,
    isArray: true,
  })
  async findList(
    @Query('page') page: number = DEFAULT_PAGINATION.page,
    @Query('limit') limit: number = DEFAULT_PAGINATION.limit,
    @Query('status') status?: EOrderStatus,
    @Query('channel') channel?: EOrderChannel,
    @Query('customerName') customerName?: string,
    @Query('customerEmail') customerEmail?: string,
  ) {
    const query: OrderQueryDto = {
      status,
      channel,
      customerName,
      customerEmail,
    };
    return this.orderService.findList({ page, limit }, query);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    const orderModel = OrderMapper.toPartialModel(dto);
    return this.orderService.update(id, orderModel);
  }
}
