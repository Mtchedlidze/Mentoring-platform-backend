import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentRepository } from '../database/repository/student-repository';
import { StudentRegistrationDTO } from './dto/student-registration.dto';
import { StudentUpdateDTO } from './dto/student-update.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}
  async findStudentByEmail(email: string) {
    return this.studentRepository.findStudentByEmail_Auth(email);
  }

  async registerStudent(studentDto: StudentRegistrationDTO) {
    const existedStudent = await this.studentRepository.findStudentByEmail(
      studentDto.email,
    );

    if (existedStudent) throw new RpcException('Email is already registered');

    let registeredStudent = await this.studentRepository.registerStudent(
      studentDto,
    );

    return registeredStudent;
  }

  async updateStudent(studentUpdateDto: StudentUpdateDTO) {
    console.log(studentUpdateDto, ' service');
    return this.studentRepository.updateStudent(studentUpdateDto);
  }
}
