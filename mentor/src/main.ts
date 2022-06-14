import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { MicroserviceFactory } from './microservice.factory'

const logger: Logger = new Logger('mentor.microservice')

async function bootstrap() {
  console.log(process.env.RMQ_URL)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    MicroserviceFactory.getMicroserviceOptions('mentor'),
  )
  await app.listen()
  logger.log(`mentor microservice running`)
}
bootstrap()
