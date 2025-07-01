// src/infrastructure/database/postgres.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { ShipmentEntity } from '../../domain/entities/shipment.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: config.get<number>('POSTGRES_PORT'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          entities: [OrderEntity, ShipmentEntity, OrderItemEntity],
          migrations: [__dirname + '/migration/*{.ts,.js}'],
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([OrderEntity, ShipmentEntity, OrderItemEntity]),
  ],
  exports: [TypeOrmModule],
})
export class PostgresDatabaseModule {}
