import { Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';
import { HttpClientService } from 'src/http-client/http-client.service';
import { RedisService } from 'src/util/redis.service';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    private http: HttpClientService,
    private cache: RedisService,
  ) {}

  async getAllOrders(category: string, skip: number, take: number) {
    const key = `OrderService:orders:group:${category}`;

    const cached = await this.cache.readListFromCache(
      key,
      skip,
      take + skip - 1,
    );

    if (cached && cached.length > 0) {
      console.log('cache found');
      return cached.map((element: string) => JSON.parse(element));
    } else {
      console.log('cache missed');
      const orders = await this.http.getAllOrders();
      const groupedOrders = this.groupOrders(orders);
      await this.cache.cacheList(key, groupedOrders, 600);
      console.log('cached succeed');
      return groupedOrders;
    }
  }

  private groupOrders(orders: OrderDto[]) {
    const groupedOrders = [].concat(
      [],
      ...orders
        .map((order) =>
          groupBy(
            order['orderLines'],
            (orderLine) =>
              `${orderLine.orderNumber}||${orderLine.storeLocation}||${orderLine.deliveryLocation?.name}||${orderLine.item.mode.config.name}`,
          ),
        )
        .map((order) =>
          Object.keys(order).map((key) => ({ key, data: order[key] })),
        ),
    );

    return groupedOrders;
  }
}
