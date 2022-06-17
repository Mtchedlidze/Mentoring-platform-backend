import { Controller } from '@nestjs/common'
import { MessagePattern, RpcException, Payload } from '@nestjs/microservices'
import { IMessage } from 'src/interface/IMessage'
import { MailService } from './mail.service'

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('sendEmail')
  async sendEmail(@Payload('message') message: IMessage) {
    try {
      return await this.mailService.sendMessage(message)
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
