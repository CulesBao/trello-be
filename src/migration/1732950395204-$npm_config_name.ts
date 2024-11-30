import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732950395204 implements MigrationInterface {
    name = ' $npmConfigName1732950395204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_0d61f02f3e7ab171ea8b392e151\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_38bc8944d74fa2ccf6d51b4ad55\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_3e860dde823e5412ad9010ffade\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_a70e352c0bb7112af83df0d5b07\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_bdc9e1ec18039ebdddf5437c0ac\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e47f436f07ddf9cf3f5ee2253ed\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_f14e485802f72091b7480fbe322\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_38bc8944d74fa2ccf6d51b4ad55\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_bdc9e1ec18039ebdddf5437c0ac\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_3e860dde823e5412ad9010ffade\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_0d61f02f3e7ab171ea8b392e151\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_a70e352c0bb7112af83df0d5b07\` FOREIGN KEY (\`checkListId\`) REFERENCES \`check_list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e47f436f07ddf9cf3f5ee2253ed\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_f14e485802f72091b7480fbe322\` FOREIGN KEY (\`board_id\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_f14e485802f72091b7480fbe322\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e47f436f07ddf9cf3f5ee2253ed\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_a70e352c0bb7112af83df0d5b07\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_0d61f02f3e7ab171ea8b392e151\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_3e860dde823e5412ad9010ffade\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_bdc9e1ec18039ebdddf5437c0ac\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_38bc8944d74fa2ccf6d51b4ad55\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_f14e485802f72091b7480fbe322\` FOREIGN KEY (\`board_id\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e47f436f07ddf9cf3f5ee2253ed\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_bdc9e1ec18039ebdddf5437c0ac\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_a70e352c0bb7112af83df0d5b07\` FOREIGN KEY (\`checkListId\`) REFERENCES \`check_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_3e860dde823e5412ad9010ffade\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_38bc8944d74fa2ccf6d51b4ad55\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_0d61f02f3e7ab171ea8b392e151\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
