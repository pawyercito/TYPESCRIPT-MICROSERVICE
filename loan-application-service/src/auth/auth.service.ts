// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Asegúrate de importar el servicio de usuarios
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto'; // Importa CreateUserDto desde el directorio correcto
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create({
      ...createUserDto,
    });
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne(loginUserDto.username);
    console.log('User roles:', user.roles); // Imprime los roles del usuario
    if (user) {
      console.log('Retrieved password:', user.password); // Imprime la contraseña recuperada
      const isPasswordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      console.log('Password match result:', isPasswordMatch);

      if (isPasswordMatch) {
        const payload = { username: user.username, sub: user.id, roles: user.roles };
        console.log('Payload:', payload); // Imprime el payload
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
