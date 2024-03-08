import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Roles required for this route:', roles);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Roles of the user:', user.roles);

    if (!user || !user.roles) {
      return false;
    }

    return roles.some((role) => 
      user.roles.map((userRole) => userRole.name).includes(role)
    );
  }
}
