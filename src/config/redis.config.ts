import { createClient } from "redis";
import { logger } from "./pino.config";

const client = createClient({
    url: 'redis://localhost:6379'
})

client.on('connect', () => {
    logger.info('Redis client connected');
    client.flushAll()
    .then(() => {
        logger.info('Redis flushed');
    })
    .catch((error: any) => {
        logger.error(error);
    });
});

client.connect().catch((error: any) => {
    logger.error(error);
});

export default client