import express from 'express';
const app = express();
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
const PORT = parseInt(process.env.PORT as string) || 8000;
import initGraphQLApolloServer from './lib/graphql';
import UserService from './lib/services/userService';
import { decodeJWTToken } from './lib/utils/jwt';

async function main() {

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(await initGraphQLApolloServer(), {
            context: async ({req}) => {
                const token = req.headers["token"];

                try {
                const user = decodeJWTToken(token as string);
                return { user };
                } catch (error) {
                return {};
                }
            }
        }),
    );

    app.get("/", (req, res) => {
        res.send("great, hello world");
    })

    app.listen(PORT, () => console.log('server running:...', PORT))
}


main();