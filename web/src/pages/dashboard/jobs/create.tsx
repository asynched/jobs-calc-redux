import useForm, { numberFilter } from '@/hooks/useForm'

import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'
import DashboardLayout from '@/layouts/Dashboard'
import TitleHeader from '@/components/TitleHeader'

export default function CreateJob() {
  const { form, register } = useForm({
    name: '',
    hoursPerDay: '',
    estimateHours: '',
  })

  return (
    <DashboardLayout>
      <TitleHeader>Adicionar novo job</TitleHeader>
      <main className="mx-auto grid max-w-screen-xl grid-cols-3 gap-16">
        <div className="col-span-2">
          <h1 className="mb-4 text-4xl font-bold tracking-tighter">
            Dados do job
          </h1>
          <hr className="mb-10" />
          <div className="mb-10 flex flex-col">
            <label className="mb-2 text-lg">Nome do job</label>
            <input {...register('name')} type="text" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="mb-2 text-lg">
                Quantas horas
                <br />
                você vai dedicar ao job?
              </label>
              <input
                {...register('hoursPerDay', numberFilter)}
                type="text"
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-lg">
                Estimativa de
                <br />
                horas para esse job
              </label>
              <input
                {...register('estimateHours', numberFilter)}
                type="text"
                className="input"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-lg border bg-white p-12">
          <Image
            src="/assets/earning.png"
            width={102}
            height={78}
            alt="Earning"
            className="mb-6"
          />
          <p className="text-center text-lg">
            Preencha os dados ao lado para ver o valor do projeto
          </p>
          <div className="mt-auto flex w-full items-center gap-2">
            <button className="flex-1 rounded bg-green-600 py-3 px-6 font-medium tracking-tight text-white">
              SALVAR
            </button>
            <button className="grid h-12 w-12 place-items-center rounded bg-zinc-200">
              <TrashIcon aria-label="Apagar" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}
