import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShipmentEntity } from './shipment.entity';
import { EOrderStatus, EOrderChannel } from '../enums/order/order.enum';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EOrderChannel,
  })
  channel: EOrderChannel;

  @Column()
  orderNumber: string;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.PENDING,
  })
  status: EOrderStatus;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  orderDate: Date;

  @OneToMany(() => ShipmentEntity, (shipment) => shipment.order, {
    cascade: true,
  })
  shipments: ShipmentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
