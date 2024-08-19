import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { Menu, MonitorCog, Moon, Sun } from "lucide-react";


const NavbarMenu = ({ userData, status, className }) => {
  const { setTheme } = useTheme();

  return (
    <div className="hidden md:flex gap-4">
      {userData ? (
        <div className="flex gap-12 items-center">
          <Link href={"/dashboard"}>Profile</Link>
          <Link href={"/projects"}>Projects</Link>
          <Link href={"/skills"}>Skills</Link>
        </div>
      ) : (
        <Button className="bg-[#e2fd6c] text-[#000] dark:border-[#363636] w-full" onClick={() => signIn()} variant={"outline"}>
          SignIn
        </Button>
      )}
       <div className="flex items-center gap-1.5">
            <Button
              variant={"outline"}
              className="w-full bg-[#eaeaea] dark:bg-[#000] dark:border-[#1d1d1d]"
              onClick={() => setTheme("dark")}
            >
              <Moon className="w-4" />
            </Button>
            <Button
              variant={"outline"}
              className="w-full bg-[#eaeaea] dark:bg-[#000] dark:border-[#1d1d1d] "
              onClick={() => setTheme("light")}
            >
              <Sun className="w-4" />
            </Button>
            <Button
              variant={"outline"}
              className="w-full bg-[#eaeaea] dark:bg-[#000] dark:border-[#1d1d1d] "
              onClick={() => setTheme("default")}
            >
              <MonitorCog className="w-4" />
            </Button>
          </div>
    </div>
  );
};

export default NavbarMenu;
