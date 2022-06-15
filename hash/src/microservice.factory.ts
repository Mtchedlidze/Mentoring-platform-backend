import { MicroserviceOptions, Transport, RmqOptions} from '@nestjs/microservices'
import 'dotenv/config'

export class MicroserviceFactory {
  static getMicroserViceOptions(queue: string): MicroserviceOptions {
    const microserViceOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue,
        queueOptions: {
          durable: false,
        }
      },
    }

    return microserViceOptions
  }
}
