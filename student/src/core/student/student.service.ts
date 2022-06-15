import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentRepository } from '../database/repository/student-repository';
import { StudentRegistrationDTO } from './dto/student-registration.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

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
}
