import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React from 'react'

type TitleHeaderProps = {
  children: React.ReactNode
}

export default function TitleHeader({ children }: TitleHeaderProps) {
  const router = useRouter()

  return (
    <header className="mb-16 bg-zinc-700 py-6">
      <div className="mx-auto grid max-w-screen-xl grid-cols-3">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-gray-300" />
        </button>
        <p className="text-center text-gray-300">{children}</p>
      </div>
    </header>
  )
}
