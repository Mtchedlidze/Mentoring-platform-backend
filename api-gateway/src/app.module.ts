import { AuthModule } from './auth/auth.module'
import { AllExceptionsFilter } from './filters/all.exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { MentorController } from './controllers/mentor.controller'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { FileController } from './controllers/file.controller'
import { ClientProviderOptionsFactory } from './microservice.factory'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      ClientProviderOptionsFactory.getClientProviderOptions(
        'FILE_SERVICE',
        'file',
      ),
      ClientProviderOptionsFactory.getClientProviderOptions(
        'MENTOR_SERVICE',
        'mentors',
      ),
    ]),
    AuthModule,
  ],
  controllers: [FileController, MentorController],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
