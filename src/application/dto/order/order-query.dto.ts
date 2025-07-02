import { ApiPropertyOptional } from '@nestjs/swagger';
import { EOrderStatus, EOrderChannel } from 'src/domain/enums/order/order.enum';
import { IsOptional, IsEnum, IsString, IsInt, Min } from 'class-validator';
import { DEFAULT_PAGINATION } from 'src/common/constants/constants';

export class OrderQueryDto {
  @ApiPropertyOptional({ enum: EOrderStatus })
  @IsOptional()
  @IsEnum(EOrderStatus)
  status?: EOrderStatus;

  @ApiPropertyOptional({ enum: EOrderChannel })
  @IsOptional()
  @IsEnum(EOrderChannel)
  channel?: EOrderChannel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @ApiPropertyOptional({ default: DEFAULT_PAGINATION.page })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGINATION.page;

  @ApiPropertyOptional({ default: DEFAULT_PAGINATION.limit })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = DEFAULT_PAGINATION.limit;
}
