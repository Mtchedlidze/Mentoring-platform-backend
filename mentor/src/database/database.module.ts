import { Mentor, MentorSchema } from './model/mentor.model'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MentorRepository } from './repository/mentor.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
  ],
  providers: [MentorRepository],
  exports: [MentorRepository],
})
export class DatabaseModule {}
