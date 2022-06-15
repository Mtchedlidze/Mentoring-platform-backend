import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common'
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
export class StudentAuthService {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const validatedStudent = await lastValueFrom(
      this.client.send('studentAuthentication', {
        studentAuth: email,
      }),
    )

    if (validatedStudent && password === validatedStudent.password) {
      const token = this.jwtService.sign(
        { name: validatedStudent.full_name, email, role: 'student' },
        {
          expiresIn: '24h',
          secret: process.env.SECRET,
        },
      )

      return { token }
    }
  }
}
