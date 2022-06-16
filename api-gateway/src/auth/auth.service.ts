import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ClientProxy } from '@nestjs/microservices'
import {
  catchError,
  lastValueFrom,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    @Inject('MENTOR_SERVICE') private client: ClientProxy,
    @Inject('HASH_SERVICE') private clientHash: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const mentor = await lastValueFrom(this.client.send('email', { email }))
    const { hash } = await lastValueFrom(
      this.clientHash.send('hashWithSalt', { password, salt: mentor.salt }),
    )
    if (mentor && mentor.password === hash) {
      const { password, ...result } = mentor
      return result
    }
    return null
  }

  async login(mentor: any): Promise<{
    access_token: string
  }> {
    const payload = { email: mentor.email, role: mentor.role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
