"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminExists = superAdminExists;
const roleEnum_1 = require("../enum/roleEnum");
const dotenv = require("dotenv");
dotenv.config();
async function superAdminExists(userRepository) {
    if (process.env.SUPER_ADMIN_EMAIL === undefined) {
        throw new Error("Email or password is missing");
    }
    try {
        const email = process.env.SUPER_ADMIN_EMAIL;
        const user = await userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            await createSuperAdmin(userRepository);
        }
    }
    catch (error) {
        console.error(error);
    }
}
async function createSuperAdmin(userRepository) {
    if (process.env.SUPER_ADMIN_EMAIL === undefined ||
        process.env.SUPER_ADMIN_PASSWORD === undefined ||
        process.env.SUPER_ADMIN_FIRSTNAME === undefined ||
        process.env.SUPER_ADMIN_LASTNAME === undefined) {
        throw new Error("Email or password is missing");
    }
    try {
        const email = process.env.SUPER_ADMIN_EMAIL;
        const password = process.env.SUPER_ADMIN_PASSWORD;
        const firstName = process.env.SUPER_ADMIN_FIRSTNAME;
        const lastName = process.env.SUPER_ADMIN_LASTNAME;
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password,
            isEmailVerified: true,
            role: roleEnum_1.UserRole.SUPERADMIN,
        });
        await userRepository.save(newUser);
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=seedingFunction.js.map