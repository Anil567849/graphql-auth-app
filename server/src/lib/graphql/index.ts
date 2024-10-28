import { ApolloServer, BaseContext } from '@apollo/server';
import { User } from './user';

export default async function initGraphQLApolloServer(): Promise<ApolloServer<BaseContext>> {

    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDef}
            type Query {
                ${User.query}
            }
            type Mutation {
                ${User.mutation}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    });

    await server.start();
    return server;
}