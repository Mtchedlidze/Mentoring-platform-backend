import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { SentMessageInfo } from 'nodemailer'
import { IMessage } from 'src/interface/IMessage'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMessage(message: IMessage): Promise<SentMessageInfo> {
    await this.mailerService.sendMail(message)
  }
}
