import { getUserById } from "../../database/db";
import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/userService"

const queries = {
    getUserToken: async (_: any, {email, password}: GetUserTokenPayload) => {
        return await UserService.getUserToken({email, password});
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
          const id = context.user.id;
          const user = await getUserById(id);
          return user;
        }
        throw new Error("I dont know who are you");
      },
}
const mutations = {
    createUser: async (_: any, payload : CreateUserPayload) => {
        return await UserService.createUser(payload);
    }
}

export const resolvers = {queries, mutations}