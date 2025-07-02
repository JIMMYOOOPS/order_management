import { OrderQueryDto } from 'src/application/dto/order/order-query.dto';

function buildOrderFilter(query: OrderQueryDto): Partial<OrderQueryDto> {
  const where: Partial<OrderQueryDto> = {};
  if (query.status) where.status = query.status;
  if (query.channel) where.channel = query.channel;
  if (query.customerName) where.customerName = query.customerName;
  if (query.customerEmail) where.customerEmail = query.customerEmail;
  return where;
}

export { buildOrderFilter };
