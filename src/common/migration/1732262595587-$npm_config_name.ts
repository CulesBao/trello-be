import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732262595587 implements MigrationInterface {
    name = ' $npmConfigName1732262595587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(100) NOT NULL, \`description\` varchar(256) NULL, \`order\` int NOT NULL, \`dueDate\` date NULL, \`listId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`order\` int NOT NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NULL, \`workspaceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins_workspaces\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_05e67f100f26411afe9cb246ae\` (\`workspaceId\`), INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_workspaces\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_a1e67451083e224ce47fa27d2d\` (\`workspaceId\`), INDEX \`IDX_1a9367232a3056f4a700819e31\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_05e67f100f26411afe9cb246aee\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_6c534a04662d78d3dcc8b7b7221\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_a1e67451083e224ce47fa27d2dd\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` ADD CONSTRAINT \`FK_1a9367232a3056f4a700819e316\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_1a9367232a3056f4a700819e316\``);
        await queryRunner.query(`ALTER TABLE \`users_workspaces\` DROP FOREIGN KEY \`FK_a1e67451083e224ce47fa27d2dd\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_6c534a04662d78d3dcc8b7b7221\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_05e67f100f26411afe9cb246aee\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a9367232a3056f4a700819e31\` ON \`users_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1e67451083e224ce47fa27d2d\` ON \`users_workspaces\``);
        await queryRunner.query(`DROP TABLE \`users_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_05e67f100f26411afe9cb246ae\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP TABLE \`admins_workspaces\``);
        await queryRunner.query(`DROP TABLE \`workspace\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`list\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
