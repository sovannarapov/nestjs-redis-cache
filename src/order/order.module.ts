import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AppModule } from 'src/app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
