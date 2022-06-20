import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  full_name?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  salt?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio?: string
}
