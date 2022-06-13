import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import { MentorRegistrationDto } from './dtos/mentor.dto'

@Controller('mentor')
export class MentorController {
  constructor(@Inject('MENTOR_SERVICE') private client: ClientProxy) {}

  @Post('registration')
  async mentorRegistration(
    @Body() mentorRegistrationDto: MentorRegistrationDto,
  ) {
    const res = await lastValueFrom(
      this.client.send('mentorRegistration', {
        mentorRegistration: mentorRegistrationDto,
      }),
    )
    return res
  }
}
