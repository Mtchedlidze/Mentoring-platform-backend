import { ClientProviderOptions, Transport } from '@nestjs/microservices'
import config from './config/config'

export class ClientProviderOptionsFactory {
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
