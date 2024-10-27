"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const PORT = parseInt(process.env.PORT) || 8000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const resolvers = {
            Query: {
                numberSix() {
                    return 6;
                },
                numberSeven() {
                    return 7;
                },
            },
        };
        const server = new server_1.ApolloServer({
            typeDefs: `
        type Query {
            numberSix: Int! # Should always return the number 6 when queried
            numberSeven: Int! # Should always return 7
        }`,
            resolvers: resolvers
        });
        yield server.start();
        app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
        app.get("/", (req, res) => {
            res.send("great, hello world");
        });
        app.listen(PORT, () => console.log('server running:...', PORT));
    });
}
main();
