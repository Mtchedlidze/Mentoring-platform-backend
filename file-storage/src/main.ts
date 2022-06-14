import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { FileStorageModule } from './filestorage.module'
import { MicroserviceOptionsFactory } from './microservice.factory'

const logger = new Logger('file-storage microservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileStorageModule,
    { ...MicroserviceOptionsFactory.getMicroserviceOptions('file') },
  )
  await app.listen()
  logger.log('file storage microservice is running')
}
bootstrap()
