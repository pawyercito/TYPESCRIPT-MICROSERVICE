import { Controller, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service'; // Asegúrate de que esta ruta sea correcta
import { Role } from '../roles/entities/role.entity'; // Asegúrate de que esta ruta sea correcta

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body('name') name: string): Promise<Role> {
    return this.rolesService.createRole(name);
  }
}
