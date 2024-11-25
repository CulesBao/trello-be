import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732494726019 implements MigrationInterface {
    name = ' $npmConfigName1732494726019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`url\` varchar(255) NOT NULL, \`user_id\` int NULL, \`card_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_838d942dd5ed65b434cf42277d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_8c21ace9087b9539ff2bea658c4\` FOREIGN KEY (\`card_id\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_8c21ace9087b9539ff2bea658c4\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_838d942dd5ed65b434cf42277d7\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
