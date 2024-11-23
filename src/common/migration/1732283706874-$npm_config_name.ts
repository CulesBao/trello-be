import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732283706874 implements MigrationInterface {
    name = ' $npmConfigName1732283706874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_boards\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_aeaa754cc6de47db52e123c847\` (\`boardId\`), INDEX \`IDX_887a93f6d17191f5639315abee\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_aeaa754cc6de47db52e123c8472\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_887a93f6d17191f5639315abee4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_887a93f6d17191f5639315abee4\``);
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_aeaa754cc6de47db52e123c8472\``);
        await queryRunner.query(`DROP INDEX \`IDX_887a93f6d17191f5639315abee\` ON \`users_boards\``);
        await queryRunner.query(`DROP INDEX \`IDX_aeaa754cc6de47db52e123c847\` ON \`users_boards\``);
        await queryRunner.query(`DROP TABLE \`users_boards\``);
    }

}
