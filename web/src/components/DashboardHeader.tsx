import type { JobStatistics, User } from '@/domain/entities'

import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type DashboardHeaderProps = {
  user: User
  statistics: JobStatistics
}

export default function DashboardHeader({
  user,
  statistics,
}: DashboardHeaderProps) {
  return (
    <header className="bg-zinc-700 pt-6 pb-16 text-zinc-400">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-600 pb-4">
          <Image src="/assets/logo.png" alt="Logo" width={208} height={48} />
          <div>Você tem 2 horas livres no seu dia</div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="text-xl font-medium text-white">{user.name}</h3>
              <Link
                className="transition ease-in-out hover:text-white hover:underline"
                href="/dashboard/profile"
              >
                Ver perfil
              </Link>
            </div>
            <img
              src={user.profilePhoto}
              alt="Foto de perfil"
              className="h-16 w-16 rounded-full border-2 border-orange-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <HeaderInfoCard
              title="Projetos ao total"
              value={statistics.total}
            />
            <HeaderInfoCard
              title="Em andamento"
              value={statistics.inProgress}
            />
            <HeaderInfoCard title="Encerrados" value={statistics.finished} />
          </div>
          <button className="flex items-center gap-2 rounded bg-orange-500 p-2 text-zinc-100">
            <div className="grid h-8 w-8 place-items-center rounded bg-white bg-opacity-10">
              <PlusIcon className="h-6 w-6" />
            </div>
            <p className="ml-2 mr-6 text-sm font-medium">ADICIONAR NOVO JOB</p>
          </button>
        </div>
      </div>
    </header>
  )
}

type HeaderInfoCardProps = {
  title: string
  value: number
}

const HeaderInfoCard: React.FC<HeaderInfoCardProps> = ({ title, value }) => {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tighter text-white">{value}</h3>
      <p>{title}</p>
    </div>
  )
}
