import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor() {}

  async create(orderEntity: any): Promise<any> {
    // impelement your logic to save the orderEntity
    return orderEntity;
  }
}
