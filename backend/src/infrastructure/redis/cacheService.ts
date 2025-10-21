import redis from "./redisClient.js";

export class CacheService {
    async get<T>(key: string): Promise<T | null> {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds) await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
        else await redis.set(key, JSON.stringify(value));
    }
}
