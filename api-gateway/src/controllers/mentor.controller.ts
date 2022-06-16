import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { UpdateGuard } from 'src/auth/guards/update.guard'
import { Roles } from 'src/auth/roles/roles.decorator'
import { Role } from 'src/constants/enum'
import { UpdateUserDto } from 'src/dtos/user.dto'
import { UpdateInterceptor } from 'src/interceptor/update.interceptor'
import { MentorRegistrationDto } from '../dtos/mentor.dto'

@Controller('mentor')
export class MentorController {
  constructor(
    @Inject('MENTOR_SERVICE') private client: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  async mentorRegistration(
    @Body() mentorRegistrationDto: MentorRegistrationDto,
  ) {
    return await lastValueFrom(
      this.client.send('mentorRegistration', {
        mentorRegistration: mentorRegistrationDto,
      }),
    )
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async mentorLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  @Roles(Role.MENTOR)
  @UseGuards(JwtAuthGuard, RolesGuard, UpdateGuard)
  @UseInterceptors(UpdateInterceptor)
  @Put('update/:email')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('email') email: string,
  ) {
    return await lastValueFrom(
      this.client.send('userUpdate', {
        updateOptions: { ...updateUserDto },
        email,
      }),
    )
  }

  @Roles(Role.MENTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:email')
  async delete(@Param('email') email: string) {
    return await lastValueFrom(
      this.client.send('userDelete', { userDelete: email }),
    )
  }
}
