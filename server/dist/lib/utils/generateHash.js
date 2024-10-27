"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
exports.generateSalt = generateSalt;
const node_crypto_1 = require("node:crypto");
function generateHash(salt, password) {
    return (0, node_crypto_1.createHmac)("sha256", salt)
        .update(password)
        .digest("hex");
}
function generateSalt() {
    return (0, node_crypto_1.randomBytes)(32).toString("hex");
}
