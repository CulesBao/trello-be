import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732283333100 implements MigrationInterface {
    name = ' $npmConfigName1732283333100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`adminId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_b0da90aa7382961efbb5c46cf34\` FOREIGN KEY (\`adminId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_b0da90aa7382961efbb5c46cf34\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`adminId\``);
    }

}
