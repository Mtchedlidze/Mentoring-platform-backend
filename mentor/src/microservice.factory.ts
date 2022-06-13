import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices'

export class MicroserviceFactory {
  static getMicroserViceOptions(queue: string): MicroserviceOptions {
    const microserViceOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
      },
    }

    return microserViceOptions
  }
}
