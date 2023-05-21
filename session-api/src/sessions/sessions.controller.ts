import { Controller, Get, Query } from '@nestjs/common';
import { ProgramStatus, ProgramShortTitle } from './sessions.enum';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly itemsService: SessionsService) {}

  @Get()
  async GetItemsByStatus(
    @Query('status') status: ProgramStatus,
    @Query('short_title') shortTitle: ProgramShortTitle,
  ): Promise<any> {
    return this.itemsService.GetSessionsByFilter({ status, shortTitle });
  }
}
