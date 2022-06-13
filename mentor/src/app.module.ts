import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseModule } from './database/database.module'
import { MentorModule } from './mentor/mentor.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config/config'

@Module({
  imports: [
    MentorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.db_url),
  ],
})
export class AppModule {}
