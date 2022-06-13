import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import config from './config/config'
import { MicroServiceFactory } from './factory/micro-service.factory'
import { StudentController } from './student.controller'

@Module({
  imports: [
    ClientsModule.register([
      MicroServiceFactory.getMicroServiceOptions('STUDENT_SERVICE', 'student'),
    ]),
  ],
  controllers: [StudentController],
  providers: [MicroServiceFactory],
})
export class StudentModule {}
