import {
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator';

class TokenVerifDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public token: string;
}
export default TokenVerifDTO
