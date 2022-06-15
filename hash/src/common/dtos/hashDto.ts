import { IsNotEmpty, IsString,  } from "class-validator";

export class CreateHashDto {

    @IsNotEmpty()
    @IsString()
    hash: string;

    @IsNotEmpty()
    @IsString()
    salt: string;
}