import {
  Get,
  Req,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { Request } from 'express'
import { JobsService } from '@/jobs/jobs.service'
import { JwtAuthGuard } from '@/auth/guard/jwt.guard'
import { ZodSchemaPipe } from '@/utils/zod.pipe'
import { CreateJobDto, createJobSchema } from '@/jobs/dto/job.dto'

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getJobs(@Req() req: Request) {
    return this.jobsService.getJobs(req.user.id)
  }

  @Get('/statistics')
  @UseGuards(JwtAuthGuard)
  async getStatistics(@Req() req: Request) {
    return this.jobsService.getJobsStatistics(req.user.id)
  }

  @Get('/:jobId')
  @UseGuards(JwtAuthGuard)
  async getJob(
    @Req() req: Request,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    const job = this.jobsService.getJob(jobId, req.user.id)

    if (!job) {
      throw new NotFoundException('Job not found')
    }

    return job
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJob(
    @Req() req: Request,
    @Body(new ZodSchemaPipe(createJobSchema)) data: CreateJobDto,
  ) {
    return this.jobsService.createJob(req.user.id, data)
  }

  @Post('/:jobId')
  @UseGuards(JwtAuthGuard)
  async updateJob(
    @Req() req: Request,
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body(new ZodSchemaPipe(createJobSchema)) data: CreateJobDto,
  ) {
    return this.jobsService.updateJob(req.user.id, jobId, data)
  }

  @Delete('/:jobId')
  @UseGuards(JwtAuthGuard)
  async deleteJob(
    @Req() req: Request,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    return this.jobsService.deleteJob(req.user.id, jobId)
  }
}
