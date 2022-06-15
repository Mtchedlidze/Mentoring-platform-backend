import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class StudentLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
