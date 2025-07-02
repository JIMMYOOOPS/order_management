import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { EShipmentType } from 'src/domain/enums/shipment/shipment.enum';

export class UpdateShipmentDto {
  @IsString()
  shippingAddress: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @IsOptional()
  @IsEnum(EShipmentType)
  @IsString()
  type?: EShipmentType;
}
