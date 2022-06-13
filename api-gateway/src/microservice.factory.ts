import { Injectable } from '@nestjs/common'
import { ClientProviderOptions, Transport } from '@nestjs/microservices'
import config from './config/config'

@Injectable()
export class MicroserviceFactory {
  static getMicroserviceOptions(
    queue: string,
    name: string,
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
