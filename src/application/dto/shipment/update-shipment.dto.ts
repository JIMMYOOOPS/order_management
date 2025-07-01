import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateShipmentDto {
  @IsString()
  shippingAddress: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;
}
