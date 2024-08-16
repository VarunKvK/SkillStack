'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import ResponsiveMenu from './ResponsiveMenu'

export default function Header() {
  const { data: session, status } = useSession()
  return (
    <header className="p-4 backdrop-blur-sm">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-black text-2xl font-bold font-anek">SkillStack</Link>
        <ResponsiveMenu userData={session} status={status}/>
      </nav>
    </header>
  )
}