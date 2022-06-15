import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ReceivePassSaltDto } from "../dtos/hashDtos/receivePassSalt.dto";
import { ReceivePasswordDto } from "../dtos/hashDtos/receivePassword.dto";


@Controller('hash')
export class HashController {
    constructor(@Inject('HASH_SERVICE') private client: ClientProxy) {}

    @Post('randomHash')
    async randomHash(@Body() randomHashDto: ReceivePasswordDto) {
        const res = await lastValueFrom(this.client.send('randomHash', {password: randomHashDto.password}));

        Logger.log(res)
        return res
        
    }

    @Post('hashWithSalt') 
    async hashWithSalt(@Body() hashWithSaltDto: ReceivePassSaltDto) {
        const res = await lastValueFrom(this.client.send('hashWithSalt', {password: hashWithSaltDto.password, salt: hashWithSaltDto.salt}));
        
        Logger.log(res)
        return res
    }


}