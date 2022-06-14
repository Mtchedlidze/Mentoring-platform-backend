import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseModule } from './database/database.module'
import { MentorModule } from './mentor/mentor.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.db_url),
    MentorModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
