"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
exports.signJWTToken = signJWTToken;
exports.decodeJWTToken = decodeJWTToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = "Very_Secret";
function signJWTToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, exports.JWT_SECRET);
}
function decodeJWTToken(token) {
    return jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
}
