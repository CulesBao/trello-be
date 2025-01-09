import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736439327902 implements MigrationInterface {
    name = ' $npmConfigName1736439327902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dd31f454fdc52a2e336264b076\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_c691771436d1d9eda6dd775ec27\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_838d942dd5ed65b434cf42277d7\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_8c21ace9087b9539ff2bea658c4\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_b0da90aa7382961efbb5c46cf34\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_c55260d50270dc028cfd05d2583\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e32e814055967c3532cfc7db9ec\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d06878d8da282a3acb1ee0655b0\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dd31f454fdc52a2e336264b076\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_c691771436d1d9eda6dd775ec27\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_838d942dd5ed65b434cf42277d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_8c21ace9087b9539ff2bea658c4\` FOREIGN KEY (\`card_id\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_b0da90aa7382961efbb5c46cf34\` FOREIGN KEY (\`adminId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_c55260d50270dc028cfd05d2583\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e32e814055967c3532cfc7db9ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d06878d8da282a3acb1ee0655b0\` FOREIGN KEY (\`affectedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d06878d8da282a3acb1ee0655b0\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e32e814055967c3532cfc7db9ec\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_c55260d50270dc028cfd05d2583\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_b0da90aa7382961efbb5c46cf34\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_8c21ace9087b9539ff2bea658c4\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_838d942dd5ed65b434cf42277d7\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_c691771436d1d9eda6dd775ec27\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dd31f454fdc52a2e336264b076\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d06878d8da282a3acb1ee0655b0\` FOREIGN KEY (\`affectedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e32e814055967c3532cfc7db9ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_c55260d50270dc028cfd05d2583\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_b0da90aa7382961efbb5c46cf34\` FOREIGN KEY (\`adminId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_8c21ace9087b9539ff2bea658c4\` FOREIGN KEY (\`card_id\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_838d942dd5ed65b434cf42277d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_c691771436d1d9eda6dd775ec27\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dd31f454fdc52a2e336264b076\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
