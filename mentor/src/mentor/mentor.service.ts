import { MentorRepository } from './../database/repository/mentor.repository'
import { MentorRegistrationDto } from './../common/dtos/mentor.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MentorService {
  constructor(private readonly mentorRepository: MentorRepository) {}

  async mentorRegistration(mentorRegistrationDto: MentorRegistrationDto) {
    return await this.mentorRepository.registration(mentorRegistrationDto)
  }

  // async mentorLogin(mentorLoginDto: MentorLoginDto) {
  //   return await this.mentorRepository.registration(mentorLoginDto)
  // }
}
