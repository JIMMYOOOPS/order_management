import { MigrationInterface, QueryRunner } from 'typeorm';

export class StatusChange1751516188533 implements MigrationInterface {
  name = 'StatusChange1751516188533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."shipments_status_enum" RENAME TO "shipments_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_status_enum" AS ENUM('pending', 'shipped', 'delivered', 'return')`,
    );
    // 1. 先把 status 欄位暫時轉成 text
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" TYPE text USING "status"::text`,
    );
    // 2. 先移除 default
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" DROP DEFAULT`,
    );
    // 3. 再做小寫轉換
    await queryRunner.query(
      `UPDATE "shipments" SET "status" = LOWER("status")`,
    );
    // 4. 再轉回新的 enum
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" TYPE "public"."shipments_status_enum" USING "status"::"public"."shipments_status_enum"`,
    );
    // 5. 設定新的 default
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."shipments_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_type_enum_old" AS ENUM('STANDARD', 'EXPRESS', 'OVERNIGHT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "type" TYPE "public"."shipments_type_enum_old" USING "type"::"text"::"public"."shipments_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "type" SET DEFAULT 'STANDARD'`,
    );
    await queryRunner.query(`DROP TYPE "public"."shipments_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."shipments_type_enum_old" RENAME TO "shipments_type_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_status_enum_old" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'RETURN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" TYPE "public"."shipments_status_enum_old" USING "status"::"text"::"public"."shipments_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipments" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`DROP TYPE "public"."shipments_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."shipments_status_enum_old" RENAME TO "shipments_status_enum"`,
    );
  }
}
