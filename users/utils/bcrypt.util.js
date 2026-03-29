"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
async function comparePasswords(plainText, hash) {
    return bcrypt.compare(plainText, hash);
}
//# sourceMappingURL=bcrypt.util.js.map