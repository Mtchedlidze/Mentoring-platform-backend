import config from './core/utils/config/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all.exception.filter';
import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceOptionsFactory } from './core/student/microservice.factory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.db_uri),
    CoreModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}