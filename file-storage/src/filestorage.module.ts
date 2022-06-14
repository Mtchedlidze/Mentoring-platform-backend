import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AwsSdkModule } from 'nest-aws-sdk'
import { FileStorageController } from './controllers/filestorage.controller'
import { FileService } from './services/file.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (configService: ConfigService) => ({
          accessKeyId: configService.get('AWS_ID'),
          secretAccessKey: configService.get('AWS_SECRET'),
          region: configService.get('AWS_REGION'),
        }),
        inject: [ConfigService],
      },
    }),
  ],
  controllers: [FileStorageController],
  providers: [FileService],
})
export class FileStorageModule {}
