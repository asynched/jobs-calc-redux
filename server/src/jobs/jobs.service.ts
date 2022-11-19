import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateJobDto, UpdateJobDto } from '@/jobs/dto/job.dto'

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getJobs(userId: number) {
    return await this.prismaService.job.findMany({
      where: {
        userId,
      },
    })
  }

  async getJob(jobId: number, userId: number) {
    return await this.prismaService.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    })
  }

  async createJob(userId: number, data: CreateJobDto) {
    return await this.prismaService.job.create({
      data: {
        ...data,
        userId,
      },
    })
  }

  async updateJob(userId: number, jobId: number, data: UpdateJobDto) {
    const jobExists = await this.jobExists(jobId, userId)

    if (!jobExists) {
      throw new NotFoundException('Job not found')
    }

    return await this.prismaService.job.update({
      where: {
        id: jobId,
      },
      data: {
        ...data,
      },
    })
  }

  async jobExists(jobId: number, userId: number) {
    return !!(await this.prismaService.job.count({
      where: {
        id: jobId,
        userId,
      },
    }))
  }

  async deleteJob(userId: number, jobId: number) {
    const jobExists = await this.jobExists(jobId, userId)

    if (!jobExists) {
      throw new NotFoundException('Job not found')
    }

    return await this.prismaService.job.delete({
      where: {
        id: jobId,
      },
    })
  }

  async getJobsStatistics(userId: number) {
    const jobs = await this.prismaService.job.findMany({
      where: {
        userId,
      },
    })

    const total = jobs.length
    const finished = jobs.filter((job) => job.completed).length
    const inProgress = total - finished

    return {
      total,
      finished,
      inProgress,
    }
  }
}
