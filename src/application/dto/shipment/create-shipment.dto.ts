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
  shippingAddress: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
