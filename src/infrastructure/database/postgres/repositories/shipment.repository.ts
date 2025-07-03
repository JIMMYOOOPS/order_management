import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentEntity } from 'src/domain/entities/shipment.entity';

@Injectable()
export class ShipmentRepository {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentRepository: Repository<ShipmentEntity>,
  ) {}

  async findById(id: string): Promise<ShipmentEntity | null> {
    return this.shipmentRepository.findOne({ where: { id } });
  }
}
