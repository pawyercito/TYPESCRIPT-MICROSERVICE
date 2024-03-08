// src/applications/dto/create-application.dto.ts
export class CreateApplicationDto {
  readonly applicantName: string;
  readonly loanAmount: number;
  readonly loanTerm: number; // En meses
  readonly creditScore: number;
  //Agrega aquí otros campos relevantes para tu aplicación
}
