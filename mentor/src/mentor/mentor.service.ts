import { lastValueFrom } from 'rxjs'
import { UpdateUserDto } from './../common/dtos/user.dto'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { MentorRepository } from './../database/repository/mentor.repository'
import { MentorRegistrationDto } from './../common/dtos/mentor.dto'
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'

@Injectable()
export class MentorService {
  constructor(
    @Inject('HASH_SERVICE') private client: ClientProxy,
    private readonly mentorRepository: MentorRepository,
  ) {}

  async mentorRegistration(mentorRegistrationDto: MentorRegistrationDto) {
    Logger.debug('here')
    const isExists = await this.mentorRepository.findOne(
      mentorRegistrationDto.email,
    )

    Logger.error(isExists)

    if (isExists) {
      throw new RpcException('Mentor already exists!!!')
    }

    const { hash, salt } = await lastValueFrom(
      this.client.send('randomHash', {
        password: mentorRegistrationDto.password,
      }),
    )
    return await this.mentorRepository.registration(
      {
        ...mentorRegistrationDto,
        password: hash,
      },
      salt,
    )
  }

  async userUpdate(email: string, updateOptions: UpdateUserDto) {
    let updatePassword: string, updateSalt: string
    if (updateOptions.password) {
      Logger.debug('here2')
      const { hash, salt } = await lastValueFrom(
        this.client.send('randomHash', {
          password: updateOptions.password,
        }),
      )

      updatePassword = hash
      updateSalt = salt
    }

    return await this.mentorRepository.userUpdate(email, {
      ...updateOptions,
      password: updatePassword,
      salt: updateSalt,
    })
  }

  async userDelete(email: string) {
    return this.mentorRepository.userDelete(email)
  }

  async findOne(email: string) {
    return await this.mentorRepository.findOne(email)
  }
}
