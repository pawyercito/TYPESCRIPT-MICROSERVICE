// src/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';
import { In } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>, // Asegúrate de que esta inyección es correcta
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el nombre de usuario ya existe
    const existingUser = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });

    // Asignar roles al usuario
    const roles = await this.rolesRepository.find({
      where: {
        name: In(createUserDto.roles),
      },
    });
    if (roles.length === 0) {
      throw new NotFoundException('Roles not found');
    }
    user.roles = roles;

    await this.usersRepository.save(user);
    return user;
  }

  findOne(username: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.username = :username', { username })
      .getOne();
  }
}
