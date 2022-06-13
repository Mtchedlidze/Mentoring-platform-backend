import { ConfigModule } from '@nestjs/config'
import { MentorModule } from './mentor/mentor.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [MentorModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
