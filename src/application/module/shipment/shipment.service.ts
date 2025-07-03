import { Injectable } from '@nestjs/common';
import { ShipmentRepository } from 'src/infrastructure/database/postgres/repositories/shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(private readonly shipmentRepository: ShipmentRepository) {}
  async updateShipmentStatus(id: string, status: string): Promise<any> {
    const shipment = await this.shipmentRepository.findById(id);
    if (!shipment) {
      throw new Error(`Shipment with ID ${id} not found`);
    }
    return { success: true, id, status };
  }

  async findById(id: string): Promise<any> {
    const shipment = await this.shipmentRepository.findById(id);
    if (!shipment) {
      throw new Error(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }
}
