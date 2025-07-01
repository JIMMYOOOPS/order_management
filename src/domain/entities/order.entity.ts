import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShipmentEntity } from './shipment.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  channel: string;

  @Column()
  orderNumber: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  orderDate: Date;

  @Column({ nullable: true })
  deliveryDate?: Date;

  @OneToMany(() => ShipmentEntity, (shipment) => shipment.order, {
    cascade: true,
  })
  shipments: ShipmentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
