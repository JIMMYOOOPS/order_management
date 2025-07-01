import {
  IsString,
  ValidateNested,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateShipmentDto } from '../shipment/create-shipment.dto';
import { EOrderChannel } from 'src/domain/enums/order/order.enum';

export class CreateOrderDto {
  @IsString()
  channel: EOrderChannel;

  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsDateString()
  orderDate: string;

  @ValidateNested({ each: true })
  @Type(() => CreateShipmentDto)
  shipments: CreateShipmentDto[];
}
