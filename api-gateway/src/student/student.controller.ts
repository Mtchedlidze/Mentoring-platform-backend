import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { RegisterStudentDTO } from './dto/register-student.dto'

@Controller('api')
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('student')
  async registration(@Body() registerStudentDTO: RegisterStudentDTO) {
    try {
      await lastValueFrom(
        this.client.send('studentRegistration', {
          studentRegistration: registerStudentDTO,
        }),
      )
    } catch (err) {
      return err
    }
  }
}
