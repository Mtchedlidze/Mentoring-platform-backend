import { IsNotEmpty, IsString } from "class-validator";

export class ReceivePasswordDto {

    @IsNotEmpty()
    @IsString()
    password: string;
}