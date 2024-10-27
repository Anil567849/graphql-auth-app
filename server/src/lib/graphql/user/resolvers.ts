import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/userService"

const queries = {
    getUserToken: async (_: any, {email, password}: GetUserTokenPayload) => {
        return await UserService.getUserToken({email, password});
    }
}
const mutations = {
    createUser: async (_: any, payload : CreateUserPayload) => {
        return await UserService.createUser(payload);
    }
}

export const resolvers = {queries, mutations}