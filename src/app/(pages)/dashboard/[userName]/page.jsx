'use client'

import { GlobalLoader } from '@/components/layout/GlobalLoader'
import { Button } from '@/components/ui/button'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Dasboard = () => {
  const { data: session, status } = useSession()
  
  const getInitials = (username) => {
    return `${username?.charAt(0) || ""}`;
  };
  
  if (status === "loading") {
    return <GlobalLoader loading={true} />;
  }
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white relative pt-[2rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-2">
              <div className="border border-[#e2fd6c] rounded-full">
                <Avatar>
                  <AvatarImage src={session?.user.image} alt={session?.user.name} />
                  <AvatarFallback>
                  {getInitials(session?.user.name)}
                  </AvatarFallback>
                </Avatar>
                {/* <Image className='object-cover relative w-full h-full rounded-full' src={session?.user.image} width={64} height={64} /> */}
              </div>
              <div className="">
                <h1 className="text-2xl">{session?.user.name}</h1>
                <p className="opacity-50 text-sm font-thin">{session?.user.email}</p>
              </div>
            </div>
          </div>
          <Settings data={session} />
        </div>
      </div>
    </div>
  )
}

export default Dasboard

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SettingsIcon } from 'lucide-react'
import Link from 'next/link'

const Settings = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="dark:text-white text-black bg-white dark:bg-black dark:border-[#1d1d1d]">
          <SettingsIcon className='w-[1.5rem]' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute z-20 right-[-2.8rem] mr-4 bg-white dark:bg-black dark:border-[#1d1d1d]">
        <DropdownMenuGroup label="Account">
          <DropdownMenuItem asChild>
            <Link href={`dashboard/${data?.user.name}/editprofile`}>
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup label="Help">
          <DropdownMenuItem>FAQ</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator className="md:block hidden" />
          <Button variant="destructive" className="text-red-200 w-full md:block hidden" onClick={() => { signOut() }}>Logout</Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}