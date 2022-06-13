import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class MentorRegistrationDto {
  @IsNotEmpty()
  @IsString()
  full_name: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  bio: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  photo_url: string
}
