import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../order-item/create-order-item.dto';

export class CreateShipmentDto {
  @IsString()
  shipmentNumber: string;

  @IsString()
  shippingAddress: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
