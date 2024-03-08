import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Agrega tu lógica de autenticación personalizada aquí
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Puedes lanzar una excepción basada en "info" o "err" si es necesario
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}