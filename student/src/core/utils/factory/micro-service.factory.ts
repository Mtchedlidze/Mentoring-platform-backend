import { Transport } from '@nestjs/microservices';
import config from '../config/config';

console.log(config().microservice.rbmq_url);

export class MicroServiceFactory {
  get(queue: string): object {
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
