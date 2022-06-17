import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailierOptionsFactory } from './factories/mailieroptions.factory'
import { MailService } from './mail/mail.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      ...MailierOptionsFactory.getMailierOptions(),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
