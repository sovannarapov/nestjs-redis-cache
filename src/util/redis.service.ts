import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private redis: Redis) {}

  async cacheList(key: string, data: any[], ttl: number) {
    const pipeline = this.redis.pipeline();
    data.forEach((element) => pipeline.rpush(key, JSON.stringify(element)));
    pipeline.expire(key, ttl);
    await pipeline.exec();
  }

  async readListFromCache(key: string, start: number, end: number) {
    return await this.redis.lrange(key, start, end);
  }
}
