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
        urls: [config().microservice.rmq_url],
        queueOptions: {
          durable: false,
        },
      },
    }

    return microserViceOptions
  }
}
