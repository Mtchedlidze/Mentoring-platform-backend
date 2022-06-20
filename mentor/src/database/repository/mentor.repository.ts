import { MentorRegistrationDto } from './../../common/dtos/mentor.dto'
import { Mentor, MentorDocument } from './../model/mentor.model'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { UpdateUserDto } from 'src/common/dtos/user.dto'

@Injectable()
export class MentorRepository {
  constructor(
    @InjectModel(Mentor.name)
    private mentorModel: SoftDeleteModel<MentorDocument>,
  ) {}

  async registration(
    mentorRegistrationDto: MentorRegistrationDto,
    salt: string,
  ): Promise<Mentor> {
    await this.mentorModel.create({ ...mentorRegistrationDto, salt })
    return this.mentorModel
      .findOne({ email: mentorRegistrationDto.email })
      .select(['-password', '-_id', '-salt'])
  }

  async userUpdate(email: string, updateOptions: UpdateUserDto) {
    return this.mentorModel.updateOne(
      { email, isDeleted: false },
      updateOptions,
    )
  }

  userDelete(email: string) {
    return this.mentorModel.softDelete({ email })
  }

  findOne(email: string) {
    return this.mentorModel.findOne({ email })
  }
}
