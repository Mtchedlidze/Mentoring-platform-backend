import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import { MentorLoginDto, MentorRegistrationDto } from './dtos/mentor.dto'

@Controller('mentor')
export class MentorController {
  constructor(@Inject('MENTOR_SERVICE') private client: ClientProxy) {}

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

  @Post('login')
  async mentorLogin(@Body() mentorLoginDto: MentorLoginDto) {
    console.log(
      '🚀 ~ file: mentor.controller.ts ~ line 23 ~ MentorController ~ mentorLogin ~ mentorLoginDto',
      mentorLoginDto,
    )

    return await lastValueFrom(
      this.client.send('mentorLogin', { mentorLogin: mentorLoginDto }),
    )
  }
}
