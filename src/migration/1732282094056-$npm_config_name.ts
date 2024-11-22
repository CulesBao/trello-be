import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732282094056 implements MigrationInterface {
    name = ' $npmConfigName1732282094056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin_boards\` (\`boardId\` int NOT NULL, \`adminId\` int NOT NULL, INDEX \`IDX_bac909c263d7c0f126a368a174\` (\`boardId\`), INDEX \`IDX_cb06773b128c863879edab7833\` (\`adminId\`), PRIMARY KEY (\`boardId\`, \`adminId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admin_boards\` ADD CONSTRAINT \`FK_bac909c263d7c0f126a368a1740\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admin_boards\` ADD CONSTRAINT \`FK_cb06773b128c863879edab78335\` FOREIGN KEY (\`adminId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_boards\` DROP FOREIGN KEY \`FK_cb06773b128c863879edab78335\``);
        await queryRunner.query(`ALTER TABLE \`admin_boards\` DROP FOREIGN KEY \`FK_bac909c263d7c0f126a368a1740\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb06773b128c863879edab7833\` ON \`admin_boards\``);
        await queryRunner.query(`DROP INDEX \`IDX_bac909c263d7c0f126a368a174\` ON \`admin_boards\``);
        await queryRunner.query(`DROP TABLE \`admin_boards\``);
    }

}
