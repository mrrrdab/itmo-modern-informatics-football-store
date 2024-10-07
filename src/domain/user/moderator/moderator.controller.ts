import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateModeratorDTO, UpdateModeratorDTO } from './dto';
import ModeratorService from './moderator.service';

@Controller('moderators')
class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post()
  create(@Body() createModeratorDTO: CreateModeratorDTO) {
    return this.moderatorService.create(createModeratorDTO);
  }

  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeratorDTO: UpdateModeratorDTO) {
    return this.moderatorService.update(+id, updateModeratorDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorService.remove(+id);
  }
}
export default ModeratorController;