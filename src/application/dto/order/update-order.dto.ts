import { IsString, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateShipmentDto } from '../shipment/update-shipment.dto';
export class UpdateOrderDto {
  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateShipmentDto)
  shipments: UpdateShipmentDto[];
}
