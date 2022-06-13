import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import config from './core/utils/config/config';
import { MicroServiceFactory } from './core/utils/factory/micro-service.factory';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    new MicroServiceFactory().get(
      config().microservice.rbmq_url,
      config().microservice.queue,
    ),
  );
  await app.listen().then(() => console.log('Microservice is listening'));
}

bootstrap();
