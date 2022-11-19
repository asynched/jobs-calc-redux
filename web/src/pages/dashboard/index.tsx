import React from 'react'
import { requiresAuth } from '@/next/server'
import { getJobs, getJobsStatistics } from '@/services/api/jobs'
import type { JobStatistics, User, Job } from '@/domain/entities'

import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import DashboardLayout from '@/layouts/Dashboard'
import DashboardHeader from '@/components/DashboardHeader'

type DashboardProps = {
  user: User
  jobs: Job[]
  statistics: JobStatistics
}

export const getServerSideProps = requiresAuth(async (ctx) => {
  const stats = await getJobsStatistics(ctx.token)
  const jobs = await getJobs(ctx.token)

  return {
    props: {
      user: ctx.user,
      statistics: stats.unwrap(),
      jobs: jobs.unwrap(),
    },
  }
})

export default function Dashboard({ user, jobs, statistics }: DashboardProps) {
  console.log(jobs)

  return (
    <DashboardLayout>
      <DashboardHeader statistics={statistics} user={user} />
      <section className="mx-auto -mt-8 grid max-w-screen-xl gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="grid grid-cols-12 items-center rounded-lg border bg-white py-6 px-12"
          >
            <p>{job.id}</p>
            <h1 className="col-span-3 text-2xl font-bold tracking-tighter">
              {job.name}
            </h1>
            <div className="col-span-2">
              <p className="text-xs font-medium text-zinc-400">PRAZO</p>
              <p className="font-medium">3 dias para a entrega</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-medium text-zinc-400">VALOR</p>
              <p className="font-medium">R$ 1000,00</p>
            </div>
            <div className="col-span-2 flex">
              <p className="rounded-full bg-green-100 px-6 py-3 text-center text-sm text-green-600">
                Em andamento
              </p>
            </div>
            <div className="col-span-2 flex justify-end gap-4">
              <button className="grid h-12 w-12 place-items-center rounded-lg border transition ease-in-out hover:bg-zinc-100">
                <PencilIcon className="h-6 w-6 text-zinc-400" />
              </button>
              <button className="grid h-12 w-12 place-items-center rounded-lg border text-zinc-400 transition ease-in-out hover:border-red-600 hover:bg-red-600 hover:text-white">
                <TrashIcon className="h-6 w-6 " />
              </button>
            </div>
          </div>
        ))}
      </section>
    </DashboardLayout>
  )
}
