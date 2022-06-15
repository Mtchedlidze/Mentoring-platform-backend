import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class StudentAuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    if (password === 'password') {
      const token = this.jwtService.sign(
        { password, email },
        {
          expiresIn: '24h',
          secret: process.env.SECRET,
        },
      )

      return { token }
    }
  }
}
