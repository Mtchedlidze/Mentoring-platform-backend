import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface'
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
        urls: [process.env.RMQ_URL],
        queue,
      },
    }
  }
}
