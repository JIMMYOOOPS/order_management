import { IsString, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateShipmentDto } from '../shipment/update-shipment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'The name of the customer placing the order',
    type: String,
    required: true,
  })
  @IsString()
  customerName: string;

  @ApiPropertyOptional({
    description: 'The email address of the customer',
    type: String,
    required: true,
  })
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
  shipments: UpdateShipmentDto[];
}
