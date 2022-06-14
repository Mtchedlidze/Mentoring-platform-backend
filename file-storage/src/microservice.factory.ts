import { MicroserviceOptions, Transport } from '@nestjs/microservices'

export class MicroserviceOptionsFactory {
  public static getMicroserviceOptions(queue: string): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    }
  }
}
