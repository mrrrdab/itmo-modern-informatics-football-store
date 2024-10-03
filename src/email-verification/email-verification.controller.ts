import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { EmailVerificationService } from './email-verification.service';
import { CreateEmailVerificationDTO, UpdateEmailVerificationDTO } from './dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Get()
  findAll() {
    return this.emailVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailVerificationService.findOne(+id);
  }

  @Post()
  create(@Body() createEmailVerificationDTO: CreateEmailVerificationDTO) {
    return this.emailVerificationService.create(createEmailVerificationDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailVerificationDTO: UpdateEmailVerificationDTO) {
    return this.emailVerificationService.update(+id, updateEmailVerificationDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailVerificationService.remove(+id);
  }
}
