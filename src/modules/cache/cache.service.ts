import client from "../../config/redis.config";

class CacheService {
    async get(key: string): Promise<object | string | null> {
        const value = await client.get(key);
        if (!value) 
            return null
        return JSON.parse(value);
    }

    async set(key: string, value: any) {
        return client.set(key, JSON.stringify(value));
    }

    async del(key: string) {
        return client.del(key);
    }
}
export default new CacheService();