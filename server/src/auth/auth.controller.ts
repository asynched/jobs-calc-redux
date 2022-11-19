import {
  Body,
  Post,
  Controller,
  UseGuards,
  BadRequestException,
  Req,
  Get,
} from '@nestjs/common'
import { ZodSchemaPipe } from '@/utils/zod.pipe'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guard/local.guard'
import { RegisterUserDto, registerUserSchema } from '@/auth/dto/user.dto'
import { JwtAuthGuard } from '@/auth/guard/jwt.guard'
import { Request } from 'express'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(new ZodSchemaPipe(registerUserSchema)) data: RegisterUserDto,
  ) {
    try {
      await this.authService.registerUser(data)

      return {
        message: 'Successfully registered',
      }
    } catch {
      throw new BadRequestException('User already exists')
    }
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req: Request) {
    return this.authService.login(req.user)
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user

    return {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      planning: {
        earnPerMonth: user.planning.earnPerMonth,
        workHoursPerDay: user.planning.workHoursPerDay,
        workDaysPerWeek: user.planning.workDaysPerWeek,
        vacationWeeksPerYear: user.planning.vacationWeeksPerYear,
        hourlyValue: user.planning.hourlyValue,
        createdAt: user.planning.createdAt,
        updatedAt: user.planning.updatedAt,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
