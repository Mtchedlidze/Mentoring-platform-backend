import {
  Body,
  Controller,
  Delete,
  HttpException,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { UpdateGuard } from 'src/auth/guards/update.guard'
import { UpdateInterceptor } from 'src/auth/interceptor/update.interceptor'
import { Roles } from 'src/auth/roles/roles.decorator'
import { StudentUpdateDTO } from 'src/dto/student-update.dto'
import { Role } from 'src/utils/constants/enum'
import { StudentRegistrationDTO } from '../dto/student.register.dto'

@Controller('api')
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async registration(@Body() studentRegistrationDTO: StudentRegistrationDTO) {
    try {
      return lastValueFrom(
        this.client.send('studentRegistration', {
          studentRegistration: {
            ...studentRegistrationDTO,
          },
        }),
      )
    } catch (err) {
      Logger.error(err)
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

  @Roles(Role.MENTOR)
  @UseGuards(JwtAuthGuard, RolesGuard, UpdateGuard)
  @UseInterceptors(UpdateInterceptor)
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

  @Roles(Role.MENTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:email')
  async delete(@Param('email') email: string) {
    return lastValueFrom(
      this.client.send('studentDelete', {
        student_delete: email,
      }),
    )
  }
}
