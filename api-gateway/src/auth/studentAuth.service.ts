import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class StudentAuthService {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
    @Inject('HASH_SERVICE') private readonly clientHash: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string } | string> {
    const validatedStudent = await lastValueFrom(
      this.client.send('studentAuthentication', {
        studentAuth: email,
      }),
    )

    const { hash } = await lastValueFrom(
      this.clientHash.send('hashWithSalt', {
        password: password,
        salt: validatedStudent.salt,
      }),
    )

    if (
      !validatedStudent.isDeleted &&
      hash &&
      hash === validatedStudent.password
    ) {
      const token = this.jwtService.sign(
        {
          name: validatedStudent.full_name,
          email,
          role: validatedStudent.role,
        },
        {
          expiresIn: '24h',
          secret: process.env.SECRET,
        },
      )

      return { token }
    }
  }
}
