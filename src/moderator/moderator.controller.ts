import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ModeratorService } from './moderator.service';
import { CreateModeratorDTO, UpdateModeratorDTO } from './dto';

@Controller('moderators')
export class ModeratorController {
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
