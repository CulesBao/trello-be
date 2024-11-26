import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732508666246 implements MigrationInterface {
    name = ' $npmConfigName1732508666246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`activity_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`action\` varchar(200) NOT NULL, \`entity\` varchar(200) NOT NULL, \`entityId\` varchar(200) NOT NULL, \`userId\` int NULL, \`affectedUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d06878d8da282a3acb1ee0655b0\` FOREIGN KEY (\`affectedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d06878d8da282a3acb1ee0655b0\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`DROP TABLE \`activity_log\``);
    }

}
