import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { User } from "../modules/user/User.entity";
import { Role } from "../modules/roles/Role.entity";
import { Permission } from "../modules/permissions/Permission.entity";
import { AssignRole } from "../modules/assignRole/AssignRole.entity";
import { Roles } from "../common/enums/roles.enum";
import { Permissions } from "../common/enums/permissions.enum";
import hashUtils from "../common/utils/hash.utils";

async function seed() {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log("Database connection initialized");

        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        const permissionRepository = AppDataSource.getRepository(Permission);
        const assignRoleRepository = AppDataSource.getRepository(AssignRole);

        // Clear existing data (optional - uncomment if you want to start fresh)
        // await assignRoleRepository.delete({});
        // await userRepository.delete({});
        // await roleRepository.delete({});
        // await permissionRepository.delete({});

        // 1. Seed Permissions
        console.log("Seeding permissions...");
        const permissionsData = Object.values(Permissions).map(permission => ({
            name: permission,
            description: `Permission to ${permission.replace(/([A-Z])/g, ' $1').toLowerCase()}`
        }));

        const existingPermissions = await permissionRepository.find();
        const newPermissions = [];

        for (const permData of permissionsData) {
            const existing = existingPermissions.find(p => p.name === permData.name);
            if (!existing) {
                const permission = permissionRepository.create(permData);
                newPermissions.push(permission);
            }
        }

        if (newPermissions.length > 0) {
            await permissionRepository.save(newPermissions);
            console.log(`Created ${newPermissions.length} new permissions`);
        } else {
            console.log("All permissions already exist");
        }

        // Get all permissions from database
        const allPermissions = await permissionRepository.find();

        // 2. Seed Roles
        console.log("Seeding roles...");
        const rolesData = [
            {
                name: Roles.ADMIN,
                description: "System Administrator with full access"
            },
            {
                name: Roles.USER,
                description: "Regular user with basic permissions"
            },
            {
                name: Roles.ADMIN_WORKSPACE,
                description: "Workspace administrator"
            },
            {
                name: Roles.MEMBER_WORKSPACE,
                description: "Workspace member"
            },
            {
                name: Roles.ADMIN_BOARD,
                description: "Board administrator"
            },
            {
                name: Roles.MEMBER_BOARD,
                description: "Board member"
            }
        ];

        const existingRoles = await roleRepository.find({ relations: ['permissions'] });
        const newRoles = [];

        for (const roleData of rolesData) {
            const existing = existingRoles.find(r => r.name === roleData.name);
            if (!existing) {
                const role = roleRepository.create(roleData);
                newRoles.push(role);
            }
        }

        if (newRoles.length > 0) {
            await roleRepository.save(newRoles);
            console.log(`Created ${newRoles.length} new roles`);
        } else {
            console.log("All roles already exist");
        }

        // Get all roles from database
        const allRoles = await roleRepository.find({ relations: ['permissions'] });

        // 3. Assign permissions to roles with specific permission mapping
        console.log("Assigning permissions to roles...");

        // Define permission mappings for each role
        const rolePermissionMappings = {
            [Roles.ADMIN]: allPermissions, // Admin gets all permissions

            [Roles.USER]: [
                // Basic user permissions - can read most things and create basic entities
                Permissions.GET_USER,
                Permissions.UPDATE_USER,
                Permissions.GET_WORKSPACE,
                Permissions.CREATE_WORKSPACE,
                Permissions.GET_BOARD,
                Permissions.CREATE_BOARD,
                Permissions.GET_LIST,
                Permissions.CREATE_LIST,
                Permissions.GET_CARD,
                Permissions.CREATE_CARD,
                Permissions.UPDATE_CARD,
                Permissions.GET_COMMENT,
                Permissions.ADD_COMMENT_TO_CARD,
                Permissions.UPDATE_COMMENT,
                Permissions.GET_ATTACHMENT,
                Permissions.ADD_ATTACHMENT_TO_CARD,
                Permissions.GET_CHECKLIST,
                Permissions.ADD_CHECKLIST_TO_CARD,
                Permissions.UPDATE_CHECKLIST,
                Permissions.GET_NOTIFICATION,
                Permissions.GET_ACTIVITY
            ],

            [Roles.ADMIN_WORKSPACE]: [
                // Workspace admin can manage workspace, boards, and members
                Permissions.GET_USER,
                Permissions.UPDATE_USER,
                Permissions.ASSIGN_ROLE,
                Permissions.REMOVE_ROLE,
                Permissions.GET_WORKSPACE,
                Permissions.CREATE_WORKSPACE,
                Permissions.UPDATE_WORKSPACE,
                Permissions.DELETE_WORKSPACE,
                Permissions.ADD_USER_TO_WORKSPACE,
                Permissions.REMOVE_USER_FROM_WORKSPACE,
                Permissions.ADD_MEMBER_AS_ADMIN,
                Permissions.REMOVE_ADMIN_FROM_WORKSPACE,
                Permissions.GET_BOARD,
                Permissions.CREATE_BOARD,
                Permissions.UPDATE_BOARD,
                Permissions.DELETE_BOARD,
                Permissions.ADD_MEMBER_TO_BOARD,
                Permissions.REMOVE_MEMBER_FROM_BOARD,
                Permissions.GET_LIST,
                Permissions.CREATE_LIST,
                Permissions.UPDATE_LIST,
                Permissions.DELETE_LIST,
                Permissions.GET_CARD,
                Permissions.CREATE_CARD,
                Permissions.UPDATE_CARD,
                Permissions.DELETE_CARD,
                Permissions.MOVE_CARD,
                Permissions.ADD_MEMBER_TO_CARD,
                Permissions.REMOVE_MEMBER_FROM_CARD,
                Permissions.GET_COMMENT,
                Permissions.ADD_COMMENT_TO_CARD,
                Permissions.UPDATE_COMMENT,
                Permissions.REMOVE_COMMENT_FROM_CARD,
                Permissions.GET_ATTACHMENT,
                Permissions.ADD_ATTACHMENT_TO_CARD,
                Permissions.REMOVE_ATTACHMENT_FROM_CARD,
                Permissions.GET_CHECKLIST,
                Permissions.ADD_CHECKLIST_TO_CARD,
                Permissions.UPDATE_CHECKLIST,
                Permissions.REMOVE_CHECKLIST_FROM_CARD,
                Permissions.GET_NOTIFICATION,
                Permissions.CREATE_NOTIFICATION,
                Permissions.UPDATE_NOTIFICATION,
                Permissions.DELETE_NOTIFICATION,
                Permissions.GET_ACTIVITY,
                Permissions.CREATE_ACTIVITY
            ],

            [Roles.MEMBER_WORKSPACE]: [
                // Workspace member - can view workspace content and interact with boards they're members of
                Permissions.GET_USER,
                Permissions.UPDATE_USER,
                Permissions.GET_WORKSPACE,
                Permissions.GET_BOARD,
                Permissions.GET_LIST,
                Permissions.GET_CARD,
                Permissions.CREATE_CARD,
                Permissions.UPDATE_CARD,
                Permissions.MOVE_CARD,
                Permissions.ADD_MEMBER_TO_CARD,
                Permissions.REMOVE_MEMBER_FROM_CARD,
                Permissions.GET_COMMENT,
                Permissions.ADD_COMMENT_TO_CARD,
                Permissions.UPDATE_COMMENT,
                Permissions.GET_ATTACHMENT,
                Permissions.ADD_ATTACHMENT_TO_CARD,
                Permissions.GET_CHECKLIST,
                Permissions.ADD_CHECKLIST_TO_CARD,
                Permissions.UPDATE_CHECKLIST,
                Permissions.ADD_DUE_DATE_TO_CARD,
                Permissions.REMOVE_DUE_DATE_FROM_CARD,
                Permissions.ADD_DESCRIPTION_TO_CARD,
                Permissions.REMOVE_DESCRIPTION_FROM_CARD,
                Permissions.ADD_VOTE_TO_CARD,
                Permissions.REMOVE_VOTE_FROM_CARD,
                Permissions.ADD_SUBSCRIBER_TO_CARD,
                Permissions.REMOVE_SUBSCRIBER_FROM_CARD,
                Permissions.GET_NOTIFICATION,
                Permissions.UPDATE_NOTIFICATION,
                Permissions.GET_ACTIVITY
            ],

            [Roles.ADMIN_BOARD]: [
                // Board admin can manage the board and its content
                Permissions.GET_USER,
                Permissions.UPDATE_USER,
                Permissions.GET_WORKSPACE,
                Permissions.GET_BOARD,
                Permissions.UPDATE_BOARD,
                Permissions.ADD_MEMBER_TO_BOARD,
                Permissions.REMOVE_MEMBER_FROM_BOARD,
                Permissions.GET_LIST,
                Permissions.CREATE_LIST,
                Permissions.UPDATE_LIST,
                Permissions.DELETE_LIST,
                Permissions.GET_CARD,
                Permissions.CREATE_CARD,
                Permissions.UPDATE_CARD,
                Permissions.DELETE_CARD,
                Permissions.MOVE_CARD,
                Permissions.ADD_MEMBER_TO_CARD,
                Permissions.REMOVE_MEMBER_FROM_CARD,
                Permissions.ADD_LABEL_TO_CARD,
                Permissions.GET_LABEL,
                Permissions.REMOVE_LABEL_FROM_CARD,
                Permissions.GET_COMMENT,
                Permissions.ADD_COMMENT_TO_CARD,
                Permissions.UPDATE_COMMENT,
                Permissions.REMOVE_COMMENT_FROM_CARD,
                Permissions.GET_ATTACHMENT,
                Permissions.ADD_ATTACHMENT_TO_CARD,
                Permissions.REMOVE_ATTACHMENT_FROM_CARD,
                Permissions.GET_CHECKLIST,
                Permissions.ADD_CHECKLIST_TO_CARD,
                Permissions.UPDATE_CHECKLIST,
                Permissions.REMOVE_CHECKLIST_FROM_CARD,
                Permissions.ADD_DUE_DATE_TO_CARD,
                Permissions.REMOVE_DUE_DATE_FROM_CARD,
                Permissions.ADD_DESCRIPTION_TO_CARD,
                Permissions.REMOVE_DESCRIPTION_FROM_CARD,
                Permissions.GET_NOTIFICATION,
                Permissions.CREATE_NOTIFICATION,
                Permissions.UPDATE_NOTIFICATION,
                Permissions.GET_ACTIVITY,
                Permissions.CREATE_ACTIVITY
            ],

            [Roles.MEMBER_BOARD]: [
                // Board member - can interact with cards and content
                Permissions.GET_USER,
                Permissions.UPDATE_USER,
                Permissions.GET_WORKSPACE,
                Permissions.GET_BOARD,
                Permissions.GET_LIST,
                Permissions.GET_CARD,
                Permissions.CREATE_CARD,
                Permissions.UPDATE_CARD,
                Permissions.MOVE_CARD,
                Permissions.ADD_MEMBER_TO_CARD,
                Permissions.REMOVE_MEMBER_FROM_CARD,
                Permissions.ADD_LABEL_TO_CARD,
                Permissions.GET_LABEL,
                Permissions.REMOVE_LABEL_FROM_CARD,
                Permissions.GET_COMMENT,
                Permissions.ADD_COMMENT_TO_CARD,
                Permissions.UPDATE_COMMENT,
                Permissions.GET_ATTACHMENT,
                Permissions.ADD_ATTACHMENT_TO_CARD,
                Permissions.GET_CHECKLIST,
                Permissions.ADD_CHECKLIST_TO_CARD,
                Permissions.UPDATE_CHECKLIST,
                Permissions.ADD_DUE_DATE_TO_CARD,
                Permissions.REMOVE_DUE_DATE_FROM_CARD,
                Permissions.ADD_DESCRIPTION_TO_CARD,
                Permissions.REMOVE_DESCRIPTION_FROM_CARD,
                Permissions.ADD_VOTE_TO_CARD,
                Permissions.REMOVE_VOTE_FROM_CARD,
                Permissions.ADD_SUBSCRIBER_TO_CARD,
                Permissions.REMOVE_SUBSCRIBER_FROM_CARD,
                Permissions.GET_NOTIFICATION,
                Permissions.UPDATE_NOTIFICATION,
                Permissions.GET_ACTIVITY
            ]
        };

        // Apply permission mappings to roles
        for (const [roleName, rolePermissions] of Object.entries(rolePermissionMappings)) {
            const role = allRoles.find(r => r.name === roleName);
            if (role && role.permissions.length === 0) {
                // Cast to Permissions array and filter permissions that exist in database
                const permissionsArray = rolePermissions as Permissions[];

                role.permissions = allPermissions.filter(dbPerm =>
                    permissionsArray.includes(dbPerm.name as Permissions)
                );

                await roleRepository.save(role);
                console.log(`Assigned ${role.permissions.length} permissions to ${roleName} role`);
            }
        }        // 4. Create admin user
        console.log("Creating admin user...");
        const existingAdmin = await userRepository.findOne({
            where: { email: "admin@gmail.com" }
        });

        let adminUser;
        if (!existingAdmin) {
            const hashedPassword = await hashUtils.hashPassword("admin");
            adminUser = userRepository.create({
                name: "System Administrator",
                email: "admin@gmail.com",
                username: "admin",
                password: hashedPassword,
                isGoogleUser: false
            });
            adminUser = await userRepository.save(adminUser);
            console.log("Created admin user");
        } else {
            adminUser = existingAdmin;
            console.log("Admin user already exists");
        }

        // 5. Assign admin role to admin user
        console.log("Assigning admin role to admin user...");
        const adminRole = allRoles.find(r => r.name === Roles.ADMIN);
        const existingAssignment = await assignRoleRepository.findOne({
            where: {
                user: { id: adminUser.id },
                role: { name: Roles.ADMIN }
            }
        });

        if (!existingAssignment && adminRole) {
            const assignRole = assignRoleRepository.create({
                user: adminUser,
                role: adminRole,
                workspace: null,
                board: null
            });
            await assignRoleRepository.save(assignRole);
            console.log("Assigned admin role to admin user");
        } else {
            console.log("Admin role already assigned to admin user");
        }

        console.log("✅ Seeding completed successfully!");
        console.log("Admin account created:");
        console.log("  Email: admin@gmail.com");
        console.log("  Password: admin");
        console.log("  Username: admin");

    } catch (error) {
        console.error("❌ Error during seeding:", error);
        throw error;
    } finally {
        // Close database connection
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Database connection closed");
        }
    }
}

// Run the seed
seed().catch(error => {
    console.error("Seed failed:", error);
    process.exit(1);
});
