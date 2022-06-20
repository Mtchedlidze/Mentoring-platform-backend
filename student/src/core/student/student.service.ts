import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { StudentRepository } from '../database/repository/student-repository';
import { StudentRegistrationDTO } from './dto/student-registration.dto';
import { StudentUpdateDTO } from './dto/student-update.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    @Inject('HASH_SERVICE') private readonly clientHash: ClientProxy,
  ) {}
  async findStudentByEmail(email: string) {
    return this.studentRepository.findStudentByEmail_Auth(email);
  }

  async registerStudent(studentRegistrationDTO: StudentRegistrationDTO) {
    const { hash: password, salt } = await lastValueFrom(
      this.clientHash.send('randomHash', {
        password: studentRegistrationDTO.password,
      }),
    );

    const existedStudent = await this.studentRepository.findStudentByEmail(
      studentRegistrationDTO.email,
    );

    if (existedStudent) throw new RpcException('Email is already registered');

    let registeredStudent = await this.studentRepository.registerStudent({
      ...studentRegistrationDTO,
      password,
      salt,
    });

    return registeredStudent;
  }

  async updateStudent(studentUpdateDto: StudentUpdateDTO) {
    console.log(studentUpdateDto, ' service');
    return this.studentRepository.updateStudent(studentUpdateDto);
  }
}
