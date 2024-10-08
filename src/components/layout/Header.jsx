'use client'

import Link from 'next/link'
import { useSession } from "next-auth/react"
import ResponsiveMenu from './ResponsiveMenu'
import NavbarMenu from './NavbarMenu'


export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="max-w-6xl mx-auto px-4 py-4 backdrop-blur-sm">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-black dark:text-white text-2xl font-bold font-anek">SkillStack</Link>
        <NavbarMenu userData={session} status={status}/>
        <ResponsiveMenu userData={session} status={status}/>
      </nav>
    </header>
  )
}