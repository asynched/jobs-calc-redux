import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from '@/auth/dto/jwt.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    })
  }

  async validate(payload: JwtPayload) {
    return await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
      include: {
        planning: true,
      },
    })
  }
}
