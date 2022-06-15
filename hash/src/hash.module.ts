import { Module } from '@nestjs/common';
import { HashController } from './controllers/hash.controller';
import { HashService } from './services/hash.service';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HashController],
  providers: [HashService],
})
export class HashModule {}
