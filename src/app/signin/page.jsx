"use client";

import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconBrandFacebookFilled, IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";

export default function SignIn() {
  return (
    <div className="bg-white dark:bg-black flex justify-center items-center h-screen w-full">
      <Tabs defaultValue="Login" className="p-4 rounded-md">
        <TabsList className="bg-white dark:bg-black w-full">
          <TabsTrigger value="Login" className="dark:text-white text-black text-lg px-8 rounded-md">
            Login
          </TabsTrigger>
          <TabsTrigger value="Register" className="dark:text-white text-black text-lg px-8 rounded-md">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login" className="mt-8">
          <h1 className="text-4xl font-medium">
            Welcome back to
            <span className="text-[#e2fd6c] font-semibold"> SkillStack</span>
          </h1>
          <div className="px-[4rem] w-full grid items-center gap-4 mt-6">
            <Button
              onClick={() => signIn("github", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center  justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center gap-.5 text-lg">
                <p className="">Github</p>
                <IconBrandGithub/>
              </span>
            </Button>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center gap-.5 text-lg">
                <p className="">Google</p>
                <IconBrandGoogleFilled/>
              </span>
            </Button>
            <Button
              onClick={() => signIn("facebook", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center  justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center text-lg">
                <p className="">Facebook</p>
                <IconBrandFacebookFilled/>
              </span>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="Register">
          <h1 className="text-4xl font-medium">
            Join the
            <span className="text-[#e2fd6c] font-semibold"> SkillStack</span>
          </h1>
          <div className="w-full grid items-center gap-4 mt-6">
            <Button
              onClick={() => signIn("github", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center gap-.5 text-lg">
                <p className="">Github</p>
                <IconBrandGithub/>
              </span>
            </Button>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center gap-.5 text-lg">
                <p className="">Google</p>
                <IconBrandGoogleFilled/>
              </span>
            </Button>
            <Button
              onClick={() => signIn("facebook", { callbackUrl: "/" })} //Need to send in to the profile
              className="relative group/btn flex space-x-2 items-center  justify-center px-4 w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input bg-black dark:bg-white dark:hover:bg-[#e2fd6c]"
            >
              <span className="flex items-center text-lg">
                <p className="">Facebook</p>
                <IconBrandFacebookFilled/>
              </span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
