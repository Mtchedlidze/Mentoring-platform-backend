import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { StudentRegistrationDTO } from './dto/student-registration.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('studentRegistration')
  getRegistrationRequest(
    @Payload('studentRegistration') studentRegisterDto: StudentRegistrationDTO,
  ) {
    try {
      return this.studentService.registerStudent(studentRegisterDto);
    } catch (err) {
      return new RpcException(err.message);
    }
  }

  @MessagePattern('studentAuthentication')
  getAuthRequest(@Payload('studentAuth') email: string) {
    return this.studentService.findStudentByEmail(email);
  }
}
