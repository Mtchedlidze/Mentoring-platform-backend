import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { FileController } from './controllers/file.controller'
import { HashController } from './controllers/hash.controller'
import { MicroserviceOptionsFactory } from './microservice.factory'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions('FILE_SERVICE', 'file'),
      MicroserviceOptionsFactory.getMicroserviceOptions('HASH_SERVICE', 'hash'),
    ]),
  ],
  controllers: [FileController, HashController],
})
export class AppModule {}
