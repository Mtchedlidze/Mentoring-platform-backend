import { MentorController } from './mentor.controller'
import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { MicroserviceFactory } from '../microservice.factory'

@Module({
  imports: [
    ClientsModule.register([
      MicroserviceFactory.getMicroserviceOptions('mentor', 'MENTOR_SERVICE'),
    ]),
  ],
  controllers: [MentorController],
})
export class MentorModule {}
