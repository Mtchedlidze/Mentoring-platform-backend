import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './model/student.model';
import { StudentRepository } from './repository/student-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentRepository],
  exports: [StudentRepository],
})
export class DatabaseModule {}
