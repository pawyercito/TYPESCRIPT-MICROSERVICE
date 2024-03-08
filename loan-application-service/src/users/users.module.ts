// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Role } from '../roles/entities/role.entity'; // Importa Role

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // Añade Role aquí
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
