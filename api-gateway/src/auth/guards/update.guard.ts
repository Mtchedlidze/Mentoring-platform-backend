import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(@Inject('MENTOR_SERVICE') private client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { email } = request.params || request.user
    const user = await lastValueFrom(this.client.send('email', { email }))
    const unmodified = request.headers['if-unmodified-since']
    if (!unmodified) return true
    const unmodifiedISO = new Date(unmodified).toISOString()
    const userDate = user.updatedAt.toISOString()
    if (unmodifiedISO === userDate) {
      return true
    }
    throw new HttpException(
      'access to the target resource has been denied',
      HttpStatus.PRECONDITION_FAILED,
    )
  }
}
