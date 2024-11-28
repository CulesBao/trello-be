import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732800681117 implements MigrationInterface {
    name = ' $npmConfigName1732800681117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`assign_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, \`role_id\` int NULL, \`workspace_id\` int NULL, \`board_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_c55260d50270dc028cfd05d2583\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e32e814055967c3532cfc7db9ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e47f436f07ddf9cf3f5ee2253ed\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_f14e485802f72091b7480fbe322\` FOREIGN KEY (\`board_id\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_f14e485802f72091b7480fbe322\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e47f436f07ddf9cf3f5ee2253ed\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e32e814055967c3532cfc7db9ec\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_c55260d50270dc028cfd05d2583\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`description\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\``);
        await queryRunner.query(`DROP TABLE \`assign_role\``);
    }

}
