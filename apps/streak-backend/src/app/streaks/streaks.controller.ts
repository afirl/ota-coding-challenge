import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streakService: StreaksService) {}

  @Get(':caseId')
  getStreak(@Param('caseId') caseId: number) {
    return this.streakService.getStreak(caseId);
  }
}
