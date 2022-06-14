import { RpcException } from '@nestjs/microservices'
import { MentorRepository } from './../database/repository/mentor.repository'
import { MentorRegistrationDto } from './../common/dtos/mentor.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class MentorService {
  constructor(private readonly mentorRepository: MentorRepository) {}

  async mentorRegistration(mentorRegistrationDto: MentorRegistrationDto) {
    const isExists = this.mentorRepository.findOne(mentorRegistrationDto.email)
    if (isExists) {
      throw new RpcException('mentor already exists blyat')
    }
    const a = await this.mentorRepository.registration(mentorRegistrationDto)
    return a
  }

  // async mentorLogin(mentorLoginDto: MentorLoginDto) {
  //   return await this.mentorRepository.registration(mentorLoginDto)
  // }
}
