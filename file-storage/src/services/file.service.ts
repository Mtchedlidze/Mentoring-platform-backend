import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

@Injectable()
export class FileService {
  private readonly s3 = new S3({ region: process.env.AWS_REGION })

  upload(file: Express.Multer.File) {
    const { originalname, buffer, filename } = file
  }
}
