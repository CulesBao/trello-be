import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732351357661 implements MigrationInterface {
    name = ' $npmConfigName1732351357661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`DROP INDEX \`FK_bbb2794eef8a900448a5f487eb5\` ON \`list\``);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`CREATE INDEX \`FK_bbb2794eef8a900448a5f487eb5\` ON \`list\` (\`boardId\`)`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
