"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = seedSuperAdmin;
const bcrypt = require("bcrypt");
const roleEnum_1 = require("../enum/roleEnum");
const dotenv = require("dotenv");
const onboard_1 = require("../enum/onboard");
dotenv.config();
async function seedSuperAdmin(userService) {
    const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase();
    const firstName = process.env.SUPER_ADMIN_FIRSTNAME;
    const lastName = process.env.SUPER_ADMIN_LASTNAME;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    if (email === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        password === undefined) {
        console.error("Super admin details is missing");
        return;
    }
    const existingUser = await userService.findOneByEmail(email);
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await userService.createSuperAdmin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: roleEnum_1.UserRole.SUPERADMIN,
            isEmailVerified: true,
            onboard: onboard_1.ONBOARDLEVEL.COMPLETED
        });
        console.log("Super admin created");
    }
    else {
        console.log("ℹSuper admin already exists");
    }
}
//# sourceMappingURL=seedSuperAdmin.js.map