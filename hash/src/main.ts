import { NestFactory } from '@nestjs/core';
import { HashModule } from './hash.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MicroserviceFactory } from './microservice.factory';

const logger: Logger = new Logger('hash.microservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    HashModule, 
    MicroserviceFactory.getMicroserViceOptions('hash')
  );
  
  await app.listen();
  logger.log('hash microservice running');
}
bootstrap();
