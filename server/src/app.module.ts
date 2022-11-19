import { Module } from '@nestjs/common'
import { AuthModule } from '@/auth/auth.module'
import { JobsModule } from '@/jobs/jobs.module'

@Module({
  imports: [AuthModule, JobsModule],
})
export class AppModule {}
