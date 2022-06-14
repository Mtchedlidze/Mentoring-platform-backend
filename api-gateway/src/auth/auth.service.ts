import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(nickname: string, pass: string): Promise<boolean> {
  //   const user = await this.usersService.findOne(nickname)
  //   return pass === user.password
  // }

  async login(payload: object) {
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
