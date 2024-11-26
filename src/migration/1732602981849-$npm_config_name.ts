import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732602981849 implements MigrationInterface {
    name = ' $npmConfigName1732602981849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`entity\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`entityId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`boardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`listId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`cardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`commentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`checkListId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_38bc8944d74fa2ccf6d51b4ad55\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_bdc9e1ec18039ebdddf5437c0ac\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_3e860dde823e5412ad9010ffade\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_0d61f02f3e7ab171ea8b392e151\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_a70e352c0bb7112af83df0d5b07\` FOREIGN KEY (\`checkListId\`) REFERENCES \`check_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_a70e352c0bb7112af83df0d5b07\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_0d61f02f3e7ab171ea8b392e151\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_3e860dde823e5412ad9010ffade\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_bdc9e1ec18039ebdddf5437c0ac\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_38bc8944d74fa2ccf6d51b4ad55\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`checkListId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`commentId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`cardId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`listId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP COLUMN \`boardId\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`entityId\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD \`entity\` varchar(200) NOT NULL`);
    }

}
