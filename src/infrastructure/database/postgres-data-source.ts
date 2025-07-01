import 'dotenv/config'; // This loads .env automatically
import { DataSource } from 'typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { ShipmentEntity } from '../../domain/entities/shipment.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'order_management',
  entities: [OrderEntity, ShipmentEntity, OrderItemEntity],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
});
