import {
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { UpdateGuard } from 'src/auth/guards/update.guard'
import { StudentUpdateDTO } from 'src/dto/student-update.dto'
import { StudentRegistrationDTO } from '../dto/student.register.dto'

@Controller('api')
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async registration(@Body() studentRegistrationDTO: StudentRegistrationDTO) {
    try {
      // get hashed password from hash-microservice and alter raw password with it
      const hashedPass = await lastValueFrom(
        this.client.send('randomHash', {
          password: studentRegistrationDTO.password,
        }),
      )
      console.log(hashedPass)

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
      return token
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @UseGuards(JwtAuthGuard, UpdateGuard)
  @Put('update/:email')
  async update(
    @Param('email') email: string,
    @Body() studentUpdateDTO: StudentUpdateDTO,
  ) {
    return lastValueFrom(
      this.client.send('studentUpdate', {
        student_update: { email, ...studentUpdateDTO },
      }),
    )
  }
}
