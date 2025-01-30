import { GraphQLClient } from "graphql-request";

const endpoint = "https://leetcode.com/graphql";
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

class GraphqlHelper {
    constructor() {
        this.client = new GraphQLClient(endpoint, { headers });
    }

    async getProblem(query) {
        try {
            const data = await this.client.request(query);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

export const graphqlHelper = new GraphqlHelper();
