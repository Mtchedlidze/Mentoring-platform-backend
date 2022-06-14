import { Module } from '@nestjs/common';
import { StudentModule } from './core/student/student.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import config from './core/utils/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.db_url),
    CoreModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
