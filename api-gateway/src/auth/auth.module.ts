import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'
import { MicroserviceOptionsFactory } from 'src/microservice.factory'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { StudentAuthService } from './studentAuth.service'

@Module({
  imports: [
    ClientsModule.register([
      MicroserviceOptionsFactory.getMicroserviceOptions(
        'STUDENT_SERVICE',
        'student',
      ),
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [StudentAuthService, JwtStrategy, LocalStrategy],
  exports: [StudentAuthService],
})
export class AuthModule {}
