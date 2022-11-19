import Link from 'next/link'
import { toast } from 'react-toastify'

import useForm from '@/hooks/useForm'
import { useRouter } from 'next/router'

import { login } from '@/services/api/auth'
import { signInSetup } from '@/actions/auth'
import { preventDefault } from '@/utils/ui'

export default function Home() {
  const router = useRouter()
  const { form, register } = useForm({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    const signal = toast.loading('Realizando login, aguarde.')
    const result = await login(form)

    if (result.isErr()) {
      toast.dismiss(signal)
      return toast.error('Credenciais inválidas, tente novamente.')
    }

    const { token } = result.unwrap()

    toast.dismiss(signal)
    toast.success('Login realizado com sucesso, redirecionando...')

    signInSetup(token)
    router.push('/dashboard')
  }

  return (
    <div className="grid h-screen w-full place-items-center bg-zinc-100 text-zinc-700">
      <main className="rounded-lg bg-white px-8 py-12 shadow-xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter">
          JobsCalc
        </h1>
        <form onSubmit={preventDefault(handleLogin)} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">E-mail</label>
            <input
              {...register('email')}
              name="email"
              type="text"
              className="input"
              placeholder="E-mail"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Senha</label>
            <input
              {...register('password')}
              name="password"
              type="password"
              className="input"
              placeholder="Senha"
            />
          </div>
          <button
            className="mt-2 rounded bg-orange-500 py-3 text-white transition ease-in-out hover:shadow-lg hover:shadow-orange-200"
            type="submit"
          >
            Login
          </button>
          <Link
            className="text-center text-orange-500 hover:underline"
            href="/register"
          >
            Não possui conta? Cadastre-se
          </Link>
        </form>
      </main>
    </div>
  )
}
