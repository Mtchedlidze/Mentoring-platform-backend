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
    let password: string;
    let updatedSalt: string;

    console.log(studentUpdateDto, 'service');
    if (studentUpdateDto.password) {
      const { hash, salt } = await lastValueFrom(
        this.clientHash.send('randomHash', {
          password: studentUpdateDto.password,
        }),
      );
      password = hash;
      updatedSalt = salt;
    }

    return this.studentRepository.updateStudent({
      ...studentUpdateDto,
      password,
      salt: updatedSalt,
    });
  }

  async deleteStudent(email: string) {
    return this.studentRepository.deleteStudent(email);
  }
}
