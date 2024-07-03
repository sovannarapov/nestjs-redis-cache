import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { RedisService } from './util/redis.service';
import { HttpClientService } from './http-client/http-client.service';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    OrderModule,
    HttpModule,
    RedisModule.forRoot({ type: 'single', url: 'redis://localhost:6379' }),
  ],
  providers: [HttpClientService, RedisService],
  exports: [HttpClientService, RedisService],
})
export class AppModule {}
