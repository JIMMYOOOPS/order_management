// get order list with pagination DTO

import { ApiProperty } from '@nestjs/swagger';
import { PaginatedList } from 'src/common/utils/pagination.util';
import { OrderEntity } from 'src/domain/entities/order.entity';

class OrderListResponseDto implements PaginatedList<OrderEntity> {
  @ApiProperty({
    description: 'List of orders',
    type: [OrderEntity],
  })
  items: OrderEntity[];

  @ApiProperty({
    description: 'Total number of orders',
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    type: Number,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
  })
  limit: number;
}

export { OrderListResponseDto };
