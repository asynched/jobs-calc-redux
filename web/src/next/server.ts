import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import type { User } from '@/domain/entities'
import { authTokenKey } from '@/globals/symbols'
import { getProfile } from '@/services/api/auth'

export const requiresAuth = <
  Props extends Record<string, any> = { [key: string]: any }
>(
  fn?: (
    ctx: GetServerSidePropsContext & { user: User; token: string }
  ) =>
    | GetServerSidePropsResult<Props>
    | Promise<GetServerSidePropsResult<Props>>
): GetServerSideProps => {
  return async (ctx) => {
    const { cookies } = ctx.req
    const token = cookies[authTokenKey]

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    const userResult = await getProfile(token)

    if (userResult.isErr()) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    const user = userResult.unwrap()

    return fn
      ? await fn({
          ...ctx,
          token,
          user,
        })
      : { props: {} }
  }
}
