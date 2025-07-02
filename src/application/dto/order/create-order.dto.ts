import {
  IsString,
  ValidateNested,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateShipmentDto } from '../shipment/create-shipment.dto';
import { EOrderChannel } from 'src/domain/enums/order/order.enum';
import { ApiProperty } from '@nestjs/swagger';

// This DTO can be expanded according to Multi-Channel Order Management requirements
export class CreateOrderDto {
  @ApiProperty({
    description: 'The channel through which the order was placed',
    enum: EOrderChannel,
    enumName: 'EOrderChannel',
    type: String,
    required: true,
  })
  @IsString()
  channel: EOrderChannel;

  @ApiProperty({
    description: 'The name of the customer placing the order',
    type: String,
    required: true,
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'The email address of the customer',
    type: String,
    required: true,
  })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'The ISO861 date when the order was placed',
    type: String,
    format: 'date-time',
    required: true,
  })
  @IsDateString()
  orderDate: string;

  @ApiProperty({
    description: 'The Shipping Information for the order',
    type: CreateShipmentDto,
    required: true,
    isArray: true,
    example: [
      {
        shippingAddress: '123 Main St, Springfield, USA',
        deliveryDate: '2023-10-01T10:00:00Z',
        type: 'STANDARD',
        items: [
          {
            sku: 'SKU-123',
            name: 'Dog Food',
            quantity: 2,
            price: 29.99,
          },
        ],
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateShipmentDto)
  shipments: CreateShipmentDto[];
}
