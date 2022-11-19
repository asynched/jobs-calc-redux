import { Module } from '@nestjs/common'
import { JobsController } from '@/jobs/jobs.controller'
import { JobsService } from '@/jobs/jobs.service'
import { PrismaModule } from '@/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
