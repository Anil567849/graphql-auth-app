import express from 'express';
const app = express();
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
const PORT = parseInt(process.env.PORT as string) || 8000;
import initGraphQLApolloServer from './lib/graphql';

async function main() {

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(await initGraphQLApolloServer()),
    );

    app.get("/", (req, res) => {
        res.send("great, hello world");
    })

    app.listen(PORT, () => console.log('server running:...', PORT))
}


main();