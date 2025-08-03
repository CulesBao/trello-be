import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1749053558857 implements MigrationInterface {
    name = ' $npmConfigName1749053558857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`content\` varchar(500) NOT NULL, \`userId\` int NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`check_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`isDone\` tinyint NOT NULL DEFAULT 0, \`content\` varchar(200) NOT NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`url\` varchar(255) NOT NULL, \`user_id\` int NULL, \`card_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(100) NOT NULL, \`description\` varchar(256) NULL, \`order\` int NOT NULL, \`listId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`order\` int NOT NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NULL, \`workspaceId\` int NULL, \`adminId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`phoneNumber\` varchar(10) NULL, \`birthDate\` date NULL, \`isGoogleUser\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`action\` varchar(200) NOT NULL, \`userId\` int NULL, \`boardId\` int NULL, \`listId\` int NULL, \`cardId\` int NULL, \`commentId\` int NULL, \`checkListId\` int NULL, \`affectedUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`assign_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, \`role_id\` int NULL, \`workspace_id\` int NULL, \`board_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_boards\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_aeaa754cc6de47db52e123c847\` (\`boardId\`), INDEX \`IDX_887a93f6d17191f5639315abee\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins_workspaces\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_05e67f100f26411afe9cb246ae\` (\`workspaceId\`), INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_workspaces\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_a1e67451083e224ce47fa27d2d\` (\`workspaceId\`), INDEX \`IDX_1a9367232a3056f4a700819e31\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_b4599f8b8f548d35850afa2d12\` (\`roleId\`), INDEX \`IDX_06792d0c62ce6b0203c03643cd\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dd31f454fdc52a2e336264b076\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_c691771436d1d9eda6dd775ec27\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_838d942dd5ed65b434cf42277d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_8c21ace9087b9539ff2bea658c4\` FOREIGN KEY (\`card_id\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_b0da90aa7382961efbb5c46cf34\` FOREIGN KEY (\`adminId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_38bc8944d74fa2ccf6d51b4ad55\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_bdc9e1ec18039ebdddf5437c0ac\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_3e860dde823e5412ad9010ffade\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_0d61f02f3e7ab171ea8b392e151\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_a70e352c0bb7112af83df0d5b07\` FOREIGN KEY (\`checkListId\`) REFERENCES \`check_list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d06878d8da282a3acb1ee0655b0\` FOREIGN KEY (\`affectedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_c55260d50270dc028cfd05d2583\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e32e814055967c3532cfc7db9ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_e47f436f07ddf9cf3f5ee2253ed\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assign_role\` ADD CONSTRAINT \`FK_f14e485802f72091b7480fbe322\` FOREIGN KEY (\`board_id\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_aeaa754cc6de47db52e123c8472\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_boards\` ADD CONSTRAINT \`FK_887a93f6d17191f5639315abee4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_05e67f100f26411afe9cb246aee\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_6c534a04662d78d3dcc8b7b7221\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_a1e67451083e224ce47fa27d2dd\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_1a9367232a3056f4a700819e316\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\``);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_1a9367232a3056f4a700819e316\``);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_a1e67451083e224ce47fa27d2dd\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_6c534a04662d78d3dcc8b7b7221\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_05e67f100f26411afe9cb246aee\``);
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_887a93f6d17191f5639315abee4\``);
        await queryRunner.query(`ALTER TABLE \`users_boards\` DROP FOREIGN KEY \`FK_aeaa754cc6de47db52e123c8472\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_f14e485802f72091b7480fbe322\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e47f436f07ddf9cf3f5ee2253ed\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_e32e814055967c3532cfc7db9ec\``);
        await queryRunner.query(`ALTER TABLE \`assign_role\` DROP FOREIGN KEY \`FK_c55260d50270dc028cfd05d2583\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d06878d8da282a3acb1ee0655b0\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_a70e352c0bb7112af83df0d5b07\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_0d61f02f3e7ab171ea8b392e151\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_3e860dde823e5412ad9010ffade\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_bdc9e1ec18039ebdddf5437c0ac\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_38bc8944d74fa2ccf6d51b4ad55\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_b0da90aa7382961efbb5c46cf34\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_8c21ace9087b9539ff2bea658c4\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_838d942dd5ed65b434cf42277d7\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_c691771436d1d9eda6dd775ec27\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dd31f454fdc52a2e336264b076\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP INDEX \`IDX_06792d0c62ce6b0203c03643cd\` ON \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_b4599f8b8f548d35850afa2d12\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a9367232a3056f4a700819e31\` ON \`users_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1e67451083e224ce47fa27d2d\` ON \`users_workspaces\``);
        await queryRunner.query(`DROP TABLE \`users_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_05e67f100f26411afe9cb246ae\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP TABLE \`admins_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_887a93f6d17191f5639315abee\` ON \`users_boards\``);
        await queryRunner.query(`DROP INDEX \`IDX_aeaa754cc6de47db52e123c847\` ON \`users_boards\``);
        await queryRunner.query(`DROP TABLE \`users_boards\``);
        await queryRunner.query(`DROP TABLE \`assign_role\``);
        await queryRunner.query(`DROP TABLE \`activity_log\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`list\``);
        await queryRunner.query(`DROP TABLE \`card\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`check_list\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
