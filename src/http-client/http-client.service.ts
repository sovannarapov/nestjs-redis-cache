import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private http: HttpService) {}

  async getAllOrders() {
    const ordersObs = this.http.get(
      'https://run.mocky.io/v3/598d1999-d56f-4c25-92a6-36f3ec51c8e9',
    );

    return await (
      await firstValueFrom(ordersObs)
    ).data;
  }
}
