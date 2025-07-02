enum EShipmentStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  RETURN = 'RETURN',
}

enum EShipmentType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  OVERNIGHT = 'OVERNIGHT',
}

export { EShipmentStatus, EShipmentType };
