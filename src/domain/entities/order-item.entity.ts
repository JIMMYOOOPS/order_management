import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShipmentEntity } from './shipment.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ShipmentEntity, (shipment) => shipment.items)
  shipment: ShipmentEntity;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
