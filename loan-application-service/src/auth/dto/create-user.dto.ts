// src/auth/dto/create-user.dto.ts
export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly roles: string[]; // Agregar este campo para los roles
  // Otros campos relevantes
}
