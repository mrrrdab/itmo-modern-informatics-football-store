import {
  IsOptional,
  IsBoolean,
  IsString
} from 'class-validator';

class UserSystemUpdateDTO {
  @IsOptional()
  @IsString()
  public refreshToken?: string | null;

  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;
}
export default UserSystemUpdateDTO;
