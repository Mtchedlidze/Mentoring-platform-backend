import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { FileService } from 'src/services/file.service'

@Controller()
export class FileStorageController {
  constructor(private readonly fileStorageService: FileService) {}

  @MessagePattern('upload')
  async upload(@Payload('file') file: Express.Multer.File) {
    try {
      return await this.fileStorageService.upload(file)
    } catch ({ message, status }) {
      throw new RpcException({
        message,
        status,
      })
    }
  }

  @MessagePattern('delete')
  deleteFile(@Payload('key') key: string) {
    return this.fileStorageService.deleteFile(key)
  }
}
