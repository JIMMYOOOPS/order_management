import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('shipments')
export class ShipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.shipments)
  order: OrderEntity;

  @Column()
  shipmentNumber: string;

  @Column()
  shippingAddress: string;

  @Column()
  status: string;

  @OneToMany(() => OrderItemEntity, (item) => item.shipment, { cascade: true })
  items: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
