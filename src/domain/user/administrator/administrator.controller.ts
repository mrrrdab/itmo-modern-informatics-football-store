import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAdministratorDTO, UpdateAdministratorDTO } from './dto';
import AdministratorService from './administrator.service';

@Controller('administrators')
class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Get()
  findAll() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Post()
  create(@Body() createAdministratorDTO: CreateAdministratorDTO) {
    return this.administratorService.create(createAdministratorDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministratorDTO: UpdateAdministratorDTO) {
    return this.administratorService.update(+id, updateAdministratorDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
export default AdministratorController;
