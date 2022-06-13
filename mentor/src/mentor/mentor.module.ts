import { DatabaseModule } from './../database/database.module'
import { MentorController } from './mentor.controller'
import { MentorService } from './mentor.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
