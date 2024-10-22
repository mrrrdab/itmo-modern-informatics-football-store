import {
  IsOptional,
  IsString,
  IsDate
} from 'class-validator';

class EmailVerifUpdateDTO {
  @IsOptional()
  @IsString()
  public verifToken?: string;

  @IsOptional()
  @IsDate()
  public expiresAt?: string;
}
export default EmailVerifUpdateDTO;
