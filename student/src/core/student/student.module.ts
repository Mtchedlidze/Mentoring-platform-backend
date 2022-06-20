import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from '../database/database.module';
import { MicroserviceOptionsFactory } from './microservice.factory';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions('HASH_SERVICE', 'hash'),
    ]),
    DatabaseModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
