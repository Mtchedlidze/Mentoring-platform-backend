import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices'
import config from './config/config'

export class MicroserviceFactory {
  static getMicroserviceOptions(queue: string): MicroserviceOptions {
    const microserViceOptions: RmqOptions = {
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

    return microserViceOptions
  }
}
