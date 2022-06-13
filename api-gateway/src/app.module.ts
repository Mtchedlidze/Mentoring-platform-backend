import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { StudentModule } from './student/student.module'

@Module({
  imports: [ConfigModule.forRoot(), StudentModule],
})
export class AppModule {}
