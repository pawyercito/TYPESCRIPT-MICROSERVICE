// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // Asegúrate de que esta propiedad exista en la entidad User

  @Column()
  email: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
