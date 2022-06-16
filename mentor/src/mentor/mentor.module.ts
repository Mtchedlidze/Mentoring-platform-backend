import { DatabaseModule } from './../database/database.module'
import { MentorController } from './mentor.controller'
import { MentorService } from './mentor.service'
import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { MicroserviceFactory } from 'src/microservice.factory'

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      MicroserviceFactory.getClientProviderOptions('HASH_SERVICE', 'hash'),
    ]),
  ],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
