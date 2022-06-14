import { MentorRegistrationDto } from './../../common/dtos/mentor.dto'
import { Mentor, MentorDocument } from './../model/mentor.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class MentorRepository {
  constructor(
    @InjectModel(Mentor.name)
    private mentorModel: SoftDeleteModel<MentorDocument>,
  ) {}

  async registration(
    mentorRegistrationDto: MentorRegistrationDto,
  ): Promise<Mentor> {
    await this.mentorModel.create(mentorRegistrationDto)
    return this.mentorModel
      .findOne({ email: mentorRegistrationDto.email })
      .select(['-password', '-_id'])
  }

  async findOne(email: string): Promise<Mentor> {
    return await this.mentorModel.findOne({ email })
  }
}
