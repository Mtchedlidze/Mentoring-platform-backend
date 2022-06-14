import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { FileController } from './controllers/file.controller'
import { MicroserviceOptionsFactory } from './microservice.factory'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions('FILE_SERVICE', 'file'),
    ]),
  ],
  controllers: [FileController],
})
export class AppModule {}
