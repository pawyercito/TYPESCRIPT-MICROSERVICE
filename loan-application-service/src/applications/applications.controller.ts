// src/applications/applications.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Validación y conversión del 'id'
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new NotFoundException('ID no válido');
    }
    const application = await this.applicationsService.findOne(idNumber);
    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }
    return application;
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Usa el guardia de roles
  @Roles('Admin') // Especifica que solo los usuarios con el rol de 'Admin' pueden acceder a esta ruta
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }
}
