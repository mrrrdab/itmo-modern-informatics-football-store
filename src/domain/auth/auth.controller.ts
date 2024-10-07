import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
class AuthController {
  @Get()
  public getUserPayload() {

  }

  @Post('/signin')
  public async signin() {

  }

  @Post('/signup')
  public async signup() {

  }

  @Get('/logout')
  public async logout() {

  }

  @Get('/signup/verifyUserEmail')
  public async verifyUserEmail() {

  }
}
export default AuthController;
