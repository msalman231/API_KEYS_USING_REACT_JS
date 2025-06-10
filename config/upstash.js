import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";

export const client = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
    debug: true,
});

export default client;
