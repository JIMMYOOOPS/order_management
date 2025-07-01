import {
  IsString,
  ValidateNested,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateShipmentDto } from '../shipment/create-shipment.dto';

export class CreateOrderDto {
  @IsString()
  channel: string;

  @IsString()
  orderNumber: string;

  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsDateString()
  orderDate: string;

  @IsDateString()
  deliveryDate?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateShipmentDto)
  shipments: CreateShipmentDto[];
}
