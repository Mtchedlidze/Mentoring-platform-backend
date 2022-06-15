import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { StudentUpdateDTO } from 'src/core/student/dto/student-update.dto';
import { StudentRegistrationDTO } from '../../student/dto/student-registration.dto';
import { Student, StudentDocument } from '../model/student.model';

export class StudentRepository {
  constructor(
    @InjectModel(Student.name)
    private readonly model: SoftDeleteModel<StudentDocument>,
  ) {}
  async findStudentByEmail(email: string) {
    const student = await this.model
      .findOne({ email })
      .select(['full_name', 'email']);
    return student;
  }

  async findStudentByEmail_Auth(email: string) {
    const student = await this.model.findOne({ email }).select(['-__v']);
    return student;
  }

  async registerStudent(studentDto: StudentRegistrationDTO) {
    const registeredStudent = await this.model.create(studentDto);
    return registeredStudent;
  }
  async updateStudent(studentUpdateDto: StudentUpdateDTO) {
    const registeredStudent = await this.model.updateOne(
      { email: studentUpdateDto.email },
      { ...studentUpdateDto },
    );
    return registeredStudent;
  }
}
