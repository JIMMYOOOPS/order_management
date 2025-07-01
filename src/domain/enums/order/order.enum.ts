enum EOrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

enum EOrderChannel {
  MOMO = 'momo',
  AMAZON = 'amazon',
  HKTVMALL = 'hktvmall',
}

export { EOrderStatus, EOrderChannel };
