// src/applications/applications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const newApplication = this.applicationsRepository.create(createApplicationDto);
    return this.applicationsRepository.save(newApplication);
  }

  async findOne(id: number): Promise<Application> {
    return this.applicationsRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
  }
}
