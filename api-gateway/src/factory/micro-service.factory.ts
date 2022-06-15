import { ClientProviderOptions, Transport } from '@nestjs/microservices'

export class MicroServiceFactory {
  static getMicroServiceOptions(
    name: string,
    queue: string,
  ): ClientProviderOptions {
    const microserviceOptions: ClientProviderOptions = {
      name,
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
    }
    return microserviceOptions
  }
}
