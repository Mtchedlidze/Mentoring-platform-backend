import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const { email } = request.params || request.user
      const student = await lastValueFrom(
        this.client.send('studentAuthentication', { studentAuth: email }),
      )
      const unmodified = request.headers['if-unmodified-since']
      if (!unmodified) return true

      const updatedAt = student.updatedAt.toISOString()

      return unmodified <= updatedAt ? true : false
    } catch (e) {
      console.log(e)
    }
  }
}
