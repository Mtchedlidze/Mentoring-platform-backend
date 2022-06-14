import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { StudentRegistrationDTO } from './dto/student.register.dto'

@Controller('api')
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async registration(@Body() studentRegistrationDTO: StudentRegistrationDTO) {
    try {
      await lastValueFrom(
        this.client.send('studentRegistration', {
          studentRegistration: studentRegistrationDTO,
        }),
      )
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
