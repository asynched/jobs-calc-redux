type Maybe<T> = T | null | undefined

export default class Result<T, E extends Error> {
  private readonly data: Maybe<T>
  private readonly error: Maybe<E>

  private constructor(data: Maybe<T>, error: Maybe<E>) {
    this.data = data
    this.error = error
  }

  isOk(): boolean {
    return this.data !== null && this.data !== undefined
  }

  isErr(): boolean {
    return !this.isOk()
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.data as T
    }

    throw this.error
  }

  unwrapErr(): E {
    if (this.isErr()) {
      return this.error as E
    }

    throw this.data
  }

  unwrapOr(defaultValue: T): T {
    if (this.isOk()) {
      return this.data as T
    }

    return defaultValue
  }

  map<U>(fn: (data: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Result.ok(fn(this.data as T))
    }

    return Result.err(this.error as E)
  }

  mapErr<F extends Error>(fn: (error: E) => F): Result<T, F> {
    if (this.isErr()) {
      return Result.err(fn(this.error as E))
    }

    return Result.ok(this.data as T)
  }

  bimap<U, F extends Error>(
    okFn: (data: T) => U,
    errFn: (error: E) => F
  ): Result<U, F> {
    if (this.isOk()) {
      return Result.ok(okFn(this.data as T))
    }

    return Result.err(errFn(this.error as E))
  }

  static ok<T>(data: T): Result<T, any> {
    return new Result(data, null)
  }

  static err<E extends Error>(error: E): Result<any, E> {
    return new Result(null, error)
  }

  static async safePromise<T, E extends Error>(
    promise: Promise<T>
  ): Promise<Result<T, E>> {
    try {
      const data = await promise
      return Result.ok(data)
    } catch (error) {
      if (error instanceof Error) {
        return Result.err(error as E)
      }

      return Result.err(new Error(String(error)) as E)
    }
  }

  static safeAsyncFunction<Fn extends (...args: any) => Promise<any>>(fn: Fn) {
    return async (
      ...args: Parameters<Fn>
    ): Promise<Result<Awaited<ReturnType<Fn>>, Error>> => {
      try {
        const data = await fn(...args)
        return Result.ok(data)
      } catch (error) {
        if (error instanceof Error) {
          return Result.err(error)
        }

        return Result.err(new Error(String(error)))
      }
    }
  }
}
