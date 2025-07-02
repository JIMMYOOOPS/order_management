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
import {
  EShipmentStatus,
  EShipmentType,
} from '../enums/shipment/shipment.enum';

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

  @Column({
    type: 'enum',
    enum: EShipmentStatus,
    default: EShipmentStatus.PENDING,
  })
  status: EShipmentStatus;

  @Column({
    type: 'enum',
    enum: EShipmentType,
    default: EShipmentType.STANDARD,
  })
  type: EShipmentType;

  @Column({ nullable: true })
  deliveryDate?: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.shipment, { cascade: true })
  items: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
