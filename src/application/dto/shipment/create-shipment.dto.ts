import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../order-item/create-order-item.dto';
import { EShipmentType } from 'src/domain/enums/shipment/shipment.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty({
    description: 'The shipping address for the shipment',
    type: String,
    example: '123 Main St, Springfield, USA',
  })
  @IsString()
  shippingAddress: string;

  @ApiPropertyOptional({
    description: 'The delivery date for the shipment',
    type: String,
    example: '2023-10-01T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @ApiPropertyOptional({
    description: 'The type of shipment',
    enum: EShipmentType,
    example: EShipmentType.STANDARD,
  })
  @IsEnum(EShipmentType)
  @IsString()
  @IsOptional()
  type?: EShipmentType;

  @ApiProperty({
    description: 'The items included in the shipment',
    type: [CreateOrderItemDto],
    isArray: true,
    example: [
      {
        sku: 'SKU-123',
        name: 'Dog Food',
        quantity: 2,
        price: 19.99,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
