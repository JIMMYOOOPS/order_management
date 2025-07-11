import { OrderChannelHandler } from '../../../../domain/services/order-channel.handler';
import { EOrderChannel } from '../../../../domain/enums/order/order.enum';
import { AmazonHandler } from './amazon.handler';
import { MomoHandler } from './momo.handler';
import { HKTVMallHandler } from './hktvmall.handler';

// OrderChannelFactory is responsible for creating the appropriate handler based on the order channel
export class OrderChannelHandlerFactory {
  static getHandler(channel: string): OrderChannelHandler {
    switch (channel) {
      case EOrderChannel.AMAZON:
        return new AmazonHandler();
      case EOrderChannel.MOMO:
        return new MomoHandler();
      case EOrderChannel.HKTVMALL:
        return new HKTVMallHandler();
      default:
        throw new Error(`Unsupported order channel: ${channel}`);
    }
  }
}
