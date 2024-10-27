"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const queries_1 = require("./queries");
const typeDef_1 = require("./typeDef");
const mutations_1 = require("./mutations");
const resolvers_1 = require("./resolvers");
exports.User = { query: queries_1.query, typeDef: typeDef_1.typeDef, mutation: mutations_1.mutation, resolvers: resolvers_1.resolvers };
