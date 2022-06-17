import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MailModule } from './mail.module'
import { MicroserviceOptionsFactory } from './factories/microservice.factory'

const logger = new Logger('mail microservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MailModule, {
    ...MicroserviceOptionsFactory.getMicroserviceOptions('mail'),
  })
  await app.listen()
  logger.verbose('mail microservice is running')
}
bootstrap()
