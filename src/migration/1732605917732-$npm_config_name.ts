import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732605917732 implements MigrationInterface {
    name = ' $npmConfigName1732605917732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
