import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { StudentAuthService } from 'src/auth/studentAuth.service'
import { StudentLoginDTO } from 'src/dto/student-login.dto'
import { StudentRegistrationDTO } from '../dto/student.register.dto'

@Controller('api')
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
    private readonly studentAuthService: StudentAuthService,
  ) {}

  @Post('register')
  async registration(@Body() studentRegistrationDTO: StudentRegistrationDTO) {
    try {
      return lastValueFrom(
        this.client.send('studentRegistration', {
          studentRegistration: studentRegistrationDTO,
        }),
      )
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const token = req.user
      return
      // return this.studentAuthService.login(studentLoginDto)
      // return lastValueFrom(
      //   this.client.send('studentAuthentication', {
      //     studentAuth: studentLoginDto,
      //   }),
      // )
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }
}
