import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { randomBytes } from 'crypto'
import { InjectAwsService } from 'nest-aws-sdk'

@Injectable()
export class FileService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}
  public async upload(file: Express.Multer.File) {
    const { originalname, buffer } = file
    const fileExtension = originalname.split('.').pop()
    const uploadedFile = await this.s3
      .upload({
        Bucket: 'mentoring2',
        Key: this.generateRandomFileKey() + `.${fileExtension}`,
        Body: Buffer.from(buffer['data']),
      })
      .promise()

    return this.generateFilePublicUrl(uploadedFile)
  }
  public deleteFile(key: string) {
    return this.s3.deleteObject({ Key: key, Bucket: 'mentoring2' }).promise()
  }

  private generateFilePublicUrl(file: S3.ManagedUpload.SendData) {
    const { Key } = file
    const bucketUrl = process.env.S3_BUCKET_URL

    return { url: bucketUrl + Key }
  }

  private generateRandomFileKey(): string {
    return randomBytes(16).toString('hex')
  }
}
