import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, MonitorCog, Moon, Sun } from "lucide-react";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";

const ResponsiveMenu = ({ userData, status }) => {
  console.log(userData);
  const { setTheme } = useTheme();
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 bg-[#ffff] dark:bg-[#000] dark:border-[#1d1d1d]">
          {!userData ? (
            <DropdownMenuLabel>
              <Button
                variant={"outline"}
                className="bg-[#e2fd6c] dark:border-[#1d1d1d] text-[#000] w-full"
                onClick={() => signIn()}
              >
                SignIn
              </Button>
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel>Hello {userData}</DropdownMenuLabel>
          )}
          <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#1d1d1d]" />
          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href={"/dashboard"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href={"/projects"}>Projects</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href={"/skills"}>Skills</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#1d1d1d]" />
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
          {userData && (
            <DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#000]" />
              <Button
                variant={"outline"}
                className="bg-[#fd6c6c] text-white dark:border-[#1d1d1d] w-full"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ResponsiveMenu;
