import express from 'express';
const app = express();
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { save } from './lib/database/db';
const PORT = parseInt(process.env.PORT as string) || 8000;

async function main() {

    const resolvers = {
        Query: {
            numberSix() {
                return 6;
            },
            numberSeven() {
                return 7;
            },
        },
        Mutation: {
            createUser: async (_ : any , {firstName, lastName, email, password} : {firstName: string, lastName: string, email: string, password: string}) => {
                return await save(firstName, lastName, email, password);
            }
        }
    };

    const server = new ApolloServer({
        typeDefs: `
        type Query {
            numberSix: Int! # Should always return the number 6 when queried
            numberSeven: Int! # Should always return 7
        }
        type Mutation {
            createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }
        `,
        resolvers: resolvers
    });

    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server),
    );

    app.get("/", (req, res) => {
        res.send("great, hello world");
    })

    app.listen(PORT, () => console.log('server running:...', PORT))
}


main();