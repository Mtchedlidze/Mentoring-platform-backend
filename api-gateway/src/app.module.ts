import { AllExceptionsFilter } from './filters/all.exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { FileController } from './controllers/file.controller'
import { MicroserviceOptionsFactory } from './microservice.factory'
import { StudentController } from './controllers/student.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions('FILE_SERVICE', 'file'),
      MicroserviceOptionsFactory.getMicroserviceOptions(
        'STUDENT_SERVICE',
        'student',
      ),
    ]),
    AuthModule,
  ],
  controllers: [FileController, StudentController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
