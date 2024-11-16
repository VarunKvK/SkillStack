'use client'

import { GlobalLoader } from '@/components/layout/GlobalLoader'
import { Button } from '@/components/ui/button'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { BarGraphs } from "@/components/charts/BarGraphs"
import {DownloadGraphBtn} from "@/components/layout/DownloadGraphBtn"

const Dasboard = () => {
  const { data: session, status } = useSession()
  const [skills, setSkills] = useState()
  const [projects, setProjects] = useState()

  const getInitials = (username) => {
    return `${username?.charAt(0) || ""}`;
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await fetch("/api/skills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const response = await data.json()
      setSkills(response.text)
    }
    fetchSkills()

    const fetchProjects = async () => {
      const data = await fetch("/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const response = await data.json()
      console.log(response)
      setProjects(response.userProjects)
    }
    fetchProjects()
  }, [])

  if (status === "loading" && skills) {
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
              </div>
              <div className="">
                <h1 className="text-2xl">{session?.user.name}</h1>
                <p className="opacity-50 text-sm font-thin">{session?.user.email}</p>
              </div>
            </div>
          </div>
          <Settings data={session} />
        </div>
        <div className="flex justify-between w-full">
          {skills &&
            <SkillContainer skills={skills} />
          }
          {projects &&
            <ProjectContainer projects={projects} />
          }
        </div>
        {skills && (
          <div className="flex">
            <BarGraphs skills={skills} id={"bargraph"}/>
            {/* <DownloadGraphBtn chartId={"bargraph"} className="absolute"/> */}
          </div>)
        }
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
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

const SkillContainer = ({ skills }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="">Your skills</h1>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, index) => (
          <Card className="dark:bg-black bg-white dark:border-white/20 border-[#e2fd6c]" key={index}>
            <CardHeader>
              <CardTitle className="text-md dark:text-[#e2fd6c]">{s.name}</CardTitle>
              <CardDescription className="text-gray-400">{s.specific_category}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ProjectContainer = ({ projects }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="">Your projects</h1>
      <div className="flex flex-wrap gap-2">
        {projects?.project.map((p, index) => (
          <Card className="dark:bg-black bg-white dark:border-white/20 border-[#e2fd6c]" key={index}>
            <CardHeader>
              <CardTitle className="text-md dark:text-[#e2fd6c]">{p.projectTitle}</CardTitle>
              <CardDescription className="text-gray-400">{p.projectPurpose}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}