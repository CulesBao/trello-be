import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736437917720 implements MigrationInterface {
    name = ' $npmConfigName1736437917720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
