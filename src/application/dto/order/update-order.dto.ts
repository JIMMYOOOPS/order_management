import { IsString, ValidateNested, IsEmail, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateShipmentDto } from '../shipment/update-shipment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EOrderStatus } from 'src/domain/enums/order/order.enum';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'The order status according to EOrderStatus',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  status: EOrderStatus;

  @ApiPropertyOptional({
    description: 'The name of the customer placing the order',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  customerName: string;

  @ApiPropertyOptional({
    description: 'The email address of the customer',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsEmail()
  customerEmail: string;

  @ApiPropertyOptional({
    description: 'The Shipping Information for the order',
    type: UpdateShipmentDto,
    required: true,
    isArray: true,
    example: [
      {
        shippingAddress: '123 Main St, Springfield, USA',
        deliveryDate: '2023-10-01T10:00:00Z',
        type: 'STANDARD',
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateShipmentDto)
  @IsOptional()
  shipments: UpdateShipmentDto[];
}
