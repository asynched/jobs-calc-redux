import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { BcryptService } from '@/bcrypt/bcrypt.service'
import { LoginUserDto, RegisterUserDto } from '@/auth/dto/user.dto'
import { JwtPayload } from '@/auth/dto/jwt.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: await this.bcryptService.hashPassword(data.password),
      },
    })

    await this.prismaService.planning.create({
      data: {
        userId: user.id,
      },
    })

    return user
  }

  async validateUser(data: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) {
      return null
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      data.password,
      user.password,
    )

    if (!isPasswordValid) {
      return null
    }

    return user
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
