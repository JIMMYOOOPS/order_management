import { MigrationInterface, QueryRunner } from "typeorm";

export class AmendShipment1751422655598 implements MigrationInterface {
    name = 'AmendShipment1751422655598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."shipments_type_enum" AS ENUM('STANDARD', 'EXPRESS', 'OVERNIGHT')`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD "type" "public"."shipments_type_enum" NOT NULL DEFAULT 'STANDARD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."shipments_type_enum"`);
    }

}
