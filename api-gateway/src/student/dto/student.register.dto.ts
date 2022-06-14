import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class StudentRegistrationDTO {
  @IsNotEmpty()
  @IsString()
  full_name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
