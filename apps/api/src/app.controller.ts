import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './core/services/prisma.service';
import { ApiOperation } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get("/health")
  @ApiOperation({ summary: 'Check the health of the application' })
  health(): string {
    return "OK"
  }

  @Get('/metrics')
  @ApiOperation({ summary: 'Collect metrics from the application' })
  getMetrics() {
    return this.prisma.$metrics.json()
  }
}
