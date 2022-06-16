import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'
import { ClientProviderOptionsFactory } from 'src/microservice.factory'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    ClientsModule.register([
      ClientProviderOptionsFactory.getClientProviderOptions(
        'MENTOR_SERVICE',
        'mentors',
      ),
      ClientProviderOptionsFactory.getClientProviderOptions(
        'HASH_SERVICE',
        'hash',
      ),
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
