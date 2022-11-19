import { Injectable } from '@nestjs/common'
import { genSalt, compare, hash } from 'bcrypt'

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    const salt = await genSalt(10)
    return await hash(password, salt)
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
  }
}
