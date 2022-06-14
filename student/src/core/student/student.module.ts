import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
