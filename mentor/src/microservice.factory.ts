import {
  ClientProviderOptions,
  MicroserviceOptions,
  RmqOptions,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices'
import config from './config/config'

export class MicroserviceFactory {
  static getMicroserviceOptions(queue: string): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        queue,
        urls: [
          'amqps://emthybmp:UjmwELIz4Sz1xIVk1uLa0ev_DaMKjX-Y@shark.rmq.cloudamqp.com/emthybmp',
        ],
        queueOptions: {
          durable: false,
        },
      },
    }
  }

  static getClientProviderOptions(
    name: string,
    queue: string,
  ): ClientProviderOptions {
    return {
      name,
      transport: Transport.RMQ,
      options: {
        queue,
        queueOptions: {
          durable: false,
        },
        urls: [
          'amqps://emthybmp:UjmwELIz4Sz1xIVk1uLa0ev_DaMKjX-Y@shark.rmq.cloudamqp.com/emthybmp',
        ],
      },
    }
  }
}
