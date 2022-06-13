import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [DatabaseModule, StudentModule],
})
export class CoreModule {}
