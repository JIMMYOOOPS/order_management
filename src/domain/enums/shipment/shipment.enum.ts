enum EShipmentStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURN = 'return',
}

enum EShipmentType {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
}

export { EShipmentStatus, EShipmentType };
