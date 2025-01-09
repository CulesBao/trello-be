import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736438868576 implements MigrationInterface {
    name = ' $npmConfigName1736438868576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_887a93f6d17191f5639315abee4\``);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_1a9367232a3056f4a700819e316\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_887a93f6d17191f5639315abee4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_1a9367232a3056f4a700819e316\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_1a9367232a3056f4a700819e316\``);
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_887a93f6d17191f5639315abee4\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_1a9367232a3056f4a700819e316\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_887a93f6d17191f5639315abee4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
