import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class FileController {
  constructor(@Inject('FILE_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    this.client.send('upload', { file }).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    })
  }
}
