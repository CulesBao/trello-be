import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1731339268368 implements MigrationInterface {
    name = ' $npmConfigName1731339268368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`createAt\``);
    }

}
