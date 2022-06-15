import { ClientProviderOptions, Transport } from '@nestjs/microservices'

export class MicroserviceOptionsFactory {
  static getMicroserviceOptions(
    name: string,
    queue: string,
  ): ClientProviderOptions {
    return {
      name,
      transport: Transport.RMQ,
      options: {
        queueOptions: {
          durable: false,
        },
        urls: [
          'amqps://emthybmp:UjmwELIz4Sz1xIVk1uLa0ev_DaMKjX-Y@shark.rmq.cloudamqp.com/emthybmp',
        ],
        queue,
      },
    }
  }
}
