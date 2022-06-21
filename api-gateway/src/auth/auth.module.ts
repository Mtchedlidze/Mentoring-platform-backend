import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'
import { MicroserviceOptionsFactory } from 'src/microservice.factory'
import { RolesGuard } from './guards/role.guard'
import { UpdateGuard } from './guards/update.guard'
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
      MicroserviceOptionsFactory.getMicroserviceOptions('HASH_SERVICE', 'hash'),
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    StudentAuthService,
    JwtStrategy,
    LocalStrategy,
    UpdateGuard,
    RolesGuard,
  ],
  exports: [StudentAuthService],
})
export class AuthModule {}
