import { save } from "../../database/db"

const queries = {
    hello: () => {
        return 'anil'
    }
}
const mutations = {
    createUser: async (_: any, {firstName, lastName, email, password}: {firstName: string, lastName: string, email: string, password: string}) => {
        await save(firstName, lastName, email, password);
        return "id";
    }
}

export const resolvers = {queries, mutations}