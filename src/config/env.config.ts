import {hostname} from 'os';

const {
    LEETCODE_GRAPHQL_ENDPOINT,
} = process.env;

export const envConfig = {
    LEETCODE_GRAPHQL_ENDPOINT: "https://leetcode.com/graphql",
    DEFAULT_LANGUAGE: "Python3" ,
    hostname: hostname(),
};