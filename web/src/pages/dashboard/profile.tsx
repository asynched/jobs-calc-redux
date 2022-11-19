import useForm, { numberFilter } from '@/hooks/useForm'
import { User } from '@/domain/entities'
import { requiresAuth } from '@/next/server'

import DashboardLayout from '@/layouts/Dashboard'
import TitleHeader from '@/components/TitleHeader'

export const getServerSideProps = requiresAuth(async (ctx) => {
  return {
    props: {
      user: ctx.user,
    },
  }
})

type DashboardProps = {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const { form: userForm, register: registerUser } = useForm({
    name: user.name,
    profilePhoto: user.profilePhoto,
    hourlyValue: '100',
  })

  const { form: planningForm, register: registerPlanning } = useForm({
    earnPerMonth: String(user.planning.earnPerMonth),
    workHoursPerDay: String(user.planning.workHoursPerDay),
    workDaysPerWeek: String(user.planning.workDaysPerWeek),
    vacationWeeksPerYear: String(user.planning.vacationWeeksPerYear),
  })

  const handleUpdateProfile = () => {}

  return (
    <DashboardLayout>
      <TitleHeader>Meu perfil</TitleHeader>
      <main className="mx-auto grid max-w-screen-xl grid-cols-3 gap-16 pb-16">
        <div className="flex flex-col items-center rounded-lg border bg-white p-12">
          <img
            src={userForm.profilePhoto}
            alt="Foto de perfil"
            height="180"
            width="180"
            className="mb-6 rounded-full border-2 border-orange-500"
          />
          <h1 className="mb-auto text-center text-4xl font-bold tracking-tighter">
            {userForm.name}
          </h1>
          <p className="text-xl">O valor da sua hora é de:</p>
          <p className="mb-8 text-2xl font-medium tracking-tight">
            R$ {(+userForm.hourlyValue).toFixed(2).replace('.', ',')}
          </p>
          <button
            onClick={handleUpdateProfile}
            className="w-full rounded bg-green-600 py-3 text-white"
          >
            Salvar dados
          </button>
        </div>
        <div className="col-span-2">
          <h1 className="mb-4 text-4xl font-bold tracking-tighter">
            Dados do perfil
          </h1>
          <hr className="mb-10" />
          <div className="mb-16 grid grid-cols-2 gap-8">
            <input
              {...registerUser('name')}
              className="input"
              type="text"
              placeholder="Nome"
            />
            <input
              {...registerUser('profilePhoto')}
              className="input"
              type="text"
              placeholder="Link da foto"
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tighter">
            Planejamento
          </h1>
          <hr className="mb-10" />
          <div className="grid grid-cols-2 gap-8">
            <div className="grid gap-2">
              <label className="mb-2 block text-lg leading-tight">
                Quanto eu
                <br />
                quero ganhar por mês?
              </label>
              <input
                {...registerPlanning('earnPerMonth', numberFilter)}
                className="input"
                type="text"
                placeholder="2000"
              />
            </div>
            <div className="grid gap-2">
              <label className="mb-2 block text-lg leading-tight">
                Quantas horas
                <br /> eu quero trabalhar por dia?
              </label>
              <input
                {...registerPlanning('workHoursPerDay', numberFilter)}
                className="input"
                type="text"
                placeholder="8"
              />
            </div>
            <div className="grid gap-2">
              <label className="mb-2 block text-lg leading-tight">
                Quantos dias
                <br /> eu quero trabalhar por semana?
              </label>
              <input
                {...registerPlanning('workDaysPerWeek', numberFilter)}
                className="input"
                type="text"
                placeholder="5"
              />
            </div>
            <div className="grid gap-2">
              <label className="mb-2 block text-lg leading-tight">
                Quantas semanas
                <br /> por ano você tirar férias?
              </label>
              <input
                {...registerPlanning('vacationWeeksPerYear', numberFilter)}
                className="input"
                type="text"
                placeholder="2"
              />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}
