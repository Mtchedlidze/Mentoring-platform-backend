import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateHashDto } from "src/common/dtos/hashDto";
import { HashService } from "../services/hash.service";


@Controller()
export class HashController {
    constructor(private hashService: HashService) { }

    @EventPattern('randomHash')
    async createRandomHash(@Payload('password') password: string): Promise<CreateHashDto> {
        Logger.log('payload', password);
        return this.hashService.hashWithrandomSalt(password);
    }

    @EventPattern('hashWithSalt')
    async createHashWithSalt(@Payload('password') password: string, @Payload('salt') salt: string): Promise<CreateHashDto> {
        Logger.log('payload: ', password, salt);
        return this.hashService.hashWithProvidedSalt(password, salt)
    }
}