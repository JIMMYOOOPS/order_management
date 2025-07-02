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
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class OrderEntity {
  @ApiProperty({
    description: 'Unique identifier for the order',
    type: String,
    example: 'b6f1c5df-437b-4f64-80ee-d3d809e4d7a6',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The channel through which the order was placed',
    enum: EOrderChannel,
    enumName: 'EOrderChannel',
    type: String,
  })
  @Column({
    type: 'enum',
    enum: EOrderChannel,
  })
  channel: EOrderChannel;

  @ApiProperty({
    description: 'The order number',
    type: String,
    example: 'momo-1751443960294',
  })
  @Column()
  orderNumber: string;

  @ApiProperty({
    description: 'The status of the order',
    enum: EOrderStatus,
    enumName: 'EOrderStatus',
    type: String,
    default: EOrderStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.PENDING,
  })
  status: EOrderStatus;

  @ApiProperty({
    description: 'The name of the customer placing the order',
    type: String,
  })
  @Column()
  customerName: string;

  @ApiProperty({
    description: 'The email address of the customer',
    type: String,
  })
  @Column()
  customerEmail: string;

  @ApiProperty({
    description: 'The ISO861 date when the order was placed',
    type: String,
    format: 'date-time',
  })
  @Column()
  orderDate: Date;

  @ApiProperty({
    description: 'The Shipping Information for the order',
    type: [ShipmentEntity],
  })
  @OneToMany(() => ShipmentEntity, (shipment) => shipment.order, {
    cascade: true,
  })
  shipments: ShipmentEntity[];

  @ApiProperty({
    description: 'The created date of the order',
    type: String,
    format: 'date-time',
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The last updated date of the order',
    type: String,
    format: 'date-time',
    example: '2023-10-01T10:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
