import { Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
  @Get()
  public getHello(): string {
    return "Hello world!";
  }
}
export default AppController;
