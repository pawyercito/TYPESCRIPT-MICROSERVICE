import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity'; // Asegúrate de que esta ruta sea correcta

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createRole(name: string): Promise<Role> {
    const role = this.rolesRepository.create({ name });
    await this.rolesRepository.save(role);
    return role;
  }
}
