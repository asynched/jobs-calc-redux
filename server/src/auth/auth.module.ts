import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from '@/auth/auth.service'
import { BcryptModule } from '@/bcrypt/bcrypt.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { AuthController } from '@/auth/auth.controller'
import { LocalStrategy } from '@/auth/strategy/local.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    BcryptModule,
    PrismaModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
