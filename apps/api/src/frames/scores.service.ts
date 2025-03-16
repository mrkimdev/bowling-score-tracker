
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}

}