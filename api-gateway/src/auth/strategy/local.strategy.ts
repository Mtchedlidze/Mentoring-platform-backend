import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { StudentAuthService } from '../studentAuth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private studentAuthService: StudentAuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string): Promise<any> {
    return this.studentAuthService.validateUser(email, password)
  }
}
