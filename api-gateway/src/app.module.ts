import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { ClientsModule } from '@nestjs/microservices'
import { FileController } from './controllers/file.controller'
import { AllExceptionsFilter } from './filters/all.exception.filter'
import { MicroserviceOptionsFactory } from './microservice.factory'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions('FILE_SERVICE', 'file'),
    ]),
  ],
  controllers: [FileController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
