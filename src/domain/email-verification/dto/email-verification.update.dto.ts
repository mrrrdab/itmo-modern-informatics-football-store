import { IsOptional, IsString, IsDate } from 'class-validator';

export class EmailVerifUpdateDTO {
  @IsOptional()
  @IsString()
  public verifToken?: string;

  @IsOptional()
  @IsDate()
  public expiresAt?: string;
}
