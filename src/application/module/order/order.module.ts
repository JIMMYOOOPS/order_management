import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../../../infrastructure/database/postgres/repositories/order.repository';
import { OrderEntity } from 'src/domain/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService], // Export the service if needed in other modules
})
export class OrderModule {}
