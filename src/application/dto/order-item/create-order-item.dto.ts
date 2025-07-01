import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}
