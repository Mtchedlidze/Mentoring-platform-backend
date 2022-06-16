import { UpdateUserDto } from '../common/dtos/user.dto'
import {
  MentorLoginDto,
  MentorRegistrationDto,
} from './../common/dtos/mentor.dto'
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices'
import { Controller, Logger } from '@nestjs/common'
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

  @EventPattern('email')
  async getLoginRequest(@Payload('email') email: string) {
    return await this.mentorService.findOne(email)
  }

  @EventPattern('userUpdate')
  async getUpdateRequest(
    @Payload('updateOptions') updateOptions: UpdateUserDto,
    @Payload('email') email: string,
  ) {
    return await this.mentorService.userUpdate(email, updateOptions)
  }

  @EventPattern('userDelete')
  async getDeleteRequest(@Payload('userDelete') email: string) {
    return await this.mentorService.userDelete(email)
  }
}
