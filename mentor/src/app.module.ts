import { MicroserviceFactory } from 'src/microservice.factory'
import { ClientsModule } from '@nestjs/microservices'
import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseModule } from './database/database.module'
import { MentorModule } from './mentor/mentor.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config/config'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './filters/all.exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.db_url),
    MentorModule,
    
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
