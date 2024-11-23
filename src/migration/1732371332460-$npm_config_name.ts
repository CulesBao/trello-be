import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732371332460 implements MigrationInterface {
    name = ' $npmConfigName1732371332460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`content\` varchar(500) NOT NULL, \`userId\` int NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dd31f454fdc52a2e336264b076\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dd31f454fdc52a2e336264b076\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
