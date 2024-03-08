// src/applications/entities/application.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicantName: string;

  @Column('decimal')
  loanAmount: number;

  @Column('int')
  loanTerm: number;

  @Column('int')
  creditScore: number;
}
