import { IsString, IsNotEmpty } from "class-validator";

export class ReceivePassSaltDto {
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    salt: string;
}