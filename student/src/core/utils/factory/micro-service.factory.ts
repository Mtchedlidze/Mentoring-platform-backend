import { Transport } from '@nestjs/microservices';
import config from '../config/config';

export class MicroServiceFactory {
  get(url: string, queue: string): object {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://emthybmp:UjmwELIz4Sz1xIVk1uLa0ev_DaMKjX-Y@shark.rmq.cloudamqp.com/emthybmp',
        ],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
