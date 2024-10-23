import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TokenVerifDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public token: string;
}
