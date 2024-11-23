import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732027605024 implements MigrationInterface {
    name = ' $npmConfigName1732027605024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_51f2194e4a415202512807d2f63\``);
        await queryRunner.query(`CREATE TABLE \`admins_workspaces\` (\`workspaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_05e67f100f26411afe9cb246ae\` (\`workspaceId\`), INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`ownerId\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_05e67f100f26411afe9cb246aee\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` ADD CONSTRAINT \`FK_6c534a04662d78d3dcc8b7b7221\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_6c534a04662d78d3dcc8b7b7221\``);
        await queryRunner.query(`ALTER TABLE \`admins_workspaces\` DROP FOREIGN KEY \`FK_05e67f100f26411afe9cb246aee\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD \`ownerId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_6c534a04662d78d3dcc8b7b722\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_05e67f100f26411afe9cb246ae\` ON \`admins_workspaces\``);
        await queryRunner.query(`DROP TABLE \`admins_workspaces\``);
        await queryRunner.query(`ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_51f2194e4a415202512807d2f63\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
