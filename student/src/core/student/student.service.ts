import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentRepository } from '../database/repository/student-repository';
import { StudentRegistrationDTO } from './dto/student-registration.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async registerStudent(studentDto: StudentRegistrationDTO) {
    const existedStudent = await this.studentRepository.findStudentByEmail(
      studentDto.email,
    );

    if (existedStudent)
      throw new HttpException(
        'Email is already registered',
        HttpStatus.BAD_REQUEST,
      );

    let registeredStudent = await this.studentRepository.registerStudent(
      studentDto,
    );

    return registeredStudent;
  }
}
