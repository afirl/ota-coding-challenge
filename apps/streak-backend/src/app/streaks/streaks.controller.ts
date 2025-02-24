import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import type { Streak } from '@ota-coding/interfaces';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streakService: StreaksService) {}

  @Get(':caseNumber')
  getStreak(@Param('caseNumber') caseNumber: number): Streak {
    return this.streakService.getStreak(caseNumber);
  }
}
