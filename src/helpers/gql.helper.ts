import { GraphQLClient } from "graphql-request";
import { logger } from "#helpers";
import { envConfig } from "#config";

class GraphqlHelper {
    client: GraphQLClient;
    constructor() {
        this.client = new GraphQLClient(envConfig.LEETCODE_GRAPHQL_ENDPOINT!, {
            headers: {
                    'accept': '*/*',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36',
                    'content-type': 'application/json',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty'
            },
        });
    }

    async getProblem(query: string) {
        try {
            const data = await this.client.request(query);
            return data;
        } catch (error) {
            logger.error("Failed to fetch problem from GraphQL", error);
            throw error;
        }
    }
}

export const graphqlHelper = new GraphqlHelper();