import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ZodRawShape, ZodObject } from 'zod'

@Injectable()
export class ZodSchemaPipe<T extends ZodRawShape>
  implements PipeTransform<any, T>
{
  constructor(private readonly validator: ZodObject<T>) {}

  transform(value: any): T {
    const out = this.validator.safeParse(value)

    if (out.success) {
      return out.data as T
    }

    throw new BadRequestException(out.error.issues)
  }
}
