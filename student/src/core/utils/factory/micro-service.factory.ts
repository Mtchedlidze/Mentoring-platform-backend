import { Transport } from '@nestjs/microservices';
import config from '../config/config';

export class MicroServiceFactory {
  get(url: string, queue: string): object {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [config().microservice.rbmq_url],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
