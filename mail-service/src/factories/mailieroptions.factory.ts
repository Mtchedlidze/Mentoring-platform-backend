import { MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class MailierOptionsFactory {
  public static getMailierOptions(): MailerOptions {
    return {
      transport: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10),
        debug: true,
        secure: true,
        service: process.env.SERVICE,
        auth: {
          user: process.env.USER,
          pass: process.env.USER,
        },
      },
      defaults: {
        from: 'No Reply',
      },
    }
  }
}
