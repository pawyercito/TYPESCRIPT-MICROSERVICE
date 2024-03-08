// src/applications/applications.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity'; // Asegúrate de importar tu entidad

@Module({
  imports: [TypeOrmModule.forFeature([Application])], // Configura TypeOrmModule para incluir la entidad Application
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
