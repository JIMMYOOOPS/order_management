import { MigrationInterface, QueryRunner } from 'typeorm';

export class AmendOrder1751359037519 implements MigrationInterface {
  name = 'AmendOrder1751359037519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deliveryDate"`);
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD "deliveryDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'failed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_status_enum" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'RETURN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD "status" "public"."shipments_status_enum" NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "channel"`);
    await queryRunner.query(
      `CREATE TYPE "public"."orders_channel_enum" AS ENUM('momo', 'amazon', 'hktvmall')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "channel" "public"."orders_channel_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "channel"`);
    await queryRunner.query(`DROP TYPE "public"."orders_channel_enum"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "channel" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."shipments_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shipments" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shipments" DROP COLUMN "deliveryDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "deliveryDate" TIMESTAMP`,
    );
  }
}
