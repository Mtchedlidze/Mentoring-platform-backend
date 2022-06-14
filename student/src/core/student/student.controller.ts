import { Controller } from '@nestjs/common';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { StudentRegistrationDTO } from './dto/student-registration.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @EventPattern('studentRegistration')
  getRegistrationRequest(
    @Payload('studentRegistration') studentDto: StudentRegistrationDTO,
  ) {
    try {
      return this.studentService.registerStudent(studentDto);
    } catch (err) {
      return new RpcException(err.message);
    }
  }
}
