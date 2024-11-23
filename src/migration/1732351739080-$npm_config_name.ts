import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732351739080 implements MigrationInterface {
    name = ' $npmConfigName1732351739080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
