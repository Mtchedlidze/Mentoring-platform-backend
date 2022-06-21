import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/utils/constants/enum'
import { ROLES_KEY } from '../roles/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }

    const { params } = context.switchToHttp().getRequest()

    const { user } = context.switchToHttp().getRequest()

    if (params.email === user.email) {
      return true
    }

    return requiredRoles.some((role) => user.role?.includes(role))
  }
}
