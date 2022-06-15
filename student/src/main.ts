import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MicroServiceFactory } from './core/utils/factory/micro-service.factory';
const logger: Logger = new Logger('Student-Microservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    new MicroServiceFactory().get('student'),
  );
  await app.listen().then(() => logger.verbose('Microservice is listening'));
}

bootstrap();
