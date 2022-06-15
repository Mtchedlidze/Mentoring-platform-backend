import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { StudentAuthDTO } from './dto/student-auth.dto';
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
  getAuthRequest(@Payload('studentAuth') studentAuthDto: StudentAuthDTO) {
    return studentAuthDto;
  }
}
