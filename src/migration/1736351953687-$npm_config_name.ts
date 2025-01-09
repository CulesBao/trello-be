import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736351953687 implements MigrationInterface {
    name = ' $npmConfigName1736351953687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isGoogleUser\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isGoogleUser\``);
    }

}
