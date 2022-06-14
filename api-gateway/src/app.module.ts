import { MicroserviceFactory } from './factory/microservice.factory'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MentorModule } from './mentor/mentor.module'
import { Module } from '@nestjs/common'
import config from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], cache: true, isGlobal: true }),
    MentorModule,
  ],
})
export class AppModule {}
