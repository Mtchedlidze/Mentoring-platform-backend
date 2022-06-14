import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { FileService } from 'src/services/file.service'

@Controller()
export class FileStorageController {
  constructor(private readonly fileStorageService: FileService) {}

  @MessagePattern('upload')
  upload(@Payload('file') file: Express.Multer.File) {
    console.log(file)
    this.fileStorageService.upload(file)
  }
  @MessagePattern('ping')
  ping() {
    return 'pong'
  }
}
