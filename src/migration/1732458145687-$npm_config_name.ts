import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732458145687 implements MigrationInterface {
    name = ' $npmConfigName1732458145687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`check_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`isDone\` tinyint NOT NULL DEFAULT 0, \`content\` varchar(200) NOT NULL, \`userId\` int NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_8963024bc81375ebb3cfad5b7db\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_c691771436d1d9eda6dd775ec27\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_c691771436d1d9eda6dd775ec27\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_8963024bc81375ebb3cfad5b7db\``);
        await queryRunner.query(`DROP TABLE \`check_list\``);
    }

}
