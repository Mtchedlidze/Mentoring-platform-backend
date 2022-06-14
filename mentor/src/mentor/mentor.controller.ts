import {
  MentorLoginDto,
  MentorRegistrationDto,
} from './../common/dtos/mentor.dto'
import { EventPattern, Payload } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { MentorService } from './mentor.service'

@Controller()
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @EventPattern('mentorRegistration')
  async getRegistrationRequest(
    @Payload('mentorRegistration') mentorRegistrationDto: MentorRegistrationDto,
  ) {
    return await this.mentorService.mentorRegistration(mentorRegistrationDto)
  }

  @EventPattern('mentorLogin')
  async getLoginRequest(
    @Payload('mentorLogin') mentorLoginDto: MentorLoginDto,
  ) {
    // return await this.mentorService.mentorLogin(mentorLoginDto)
  }
}
