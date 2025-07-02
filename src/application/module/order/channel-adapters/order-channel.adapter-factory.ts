// import { OrderChannelHandler } from '../../../../domain/services/order-channel.handler';
// import { EOrderChannel } from '../../../../domain/enums/order/order.enum';
// import { AmazonHandler } from './amazon.handler';
// import { MomoHandler } from './momo.handler';
// import { HKTVMallHandler } from './hktvmall.handler';

// // OrderChannelFactory is responsible for creating the appropriate handler based on the order channel
// export class OrderChannelFactory {
//   static getHandler(channel: string): OrderChannelHandler {
//     switch (channel) {
//       case EOrderChannel.AMAZON:
//         return new AmazonHandler();
//       case EOrderChannel.MOMO:
//         return new MomoHandler();
//       case EOrderChannel.HKTVMALL:
//         return new HKTVMallHandler();
//       default:
//         throw new Error(`Unsupported order channel: ${channel}`);
//     }
//   }
// }

import { OrderAdapter } from '../../../../domain/services/order-channel.adapter';
import { EOrderChannel } from '../../../../domain/enums/order/order.enum';
import { MomoAdapter } from './momo.adapter';
import { HKTVMallAdapter } from './hktvmall.adapter';
import { AmazonAdapter } from './amazon.adapter';

export class OrderChannelAdapterFactory {
  static getAdapter(channel: EOrderChannel): OrderAdapter {
    switch (channel) {
      case EOrderChannel.AMAZON:
        return new AmazonAdapter();
      case EOrderChannel.MOMO:
        return new MomoAdapter();
      case EOrderChannel.HKTVMALL:
        return new HKTVMallAdapter();
      default:
        throw new Error(`Unsupported order channel: ${channel}`);
    }
  }
}
