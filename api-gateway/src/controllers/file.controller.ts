import {
  Controller,
  HttpException,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { lastValueFrom } from 'rxjs'

@Controller()
export class FileController {
  constructor(@Inject('FILE_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      return await lastValueFrom(this.client.send('upload', { file }))
    } catch (error) {
      console.log(error)
      // throw new HttpException(error)
    }
  }
}
