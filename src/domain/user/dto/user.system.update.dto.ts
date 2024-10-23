import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UserSystemUpdateDTO {
  @IsOptional()
  @IsString()
  public refreshToken?: string | null;

  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;
}
