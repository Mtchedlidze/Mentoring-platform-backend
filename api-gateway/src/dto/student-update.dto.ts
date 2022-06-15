import { IsOptional, IsString } from 'class-validator'

export class StudentUpdateDTO {
  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  full_name?: string
}
