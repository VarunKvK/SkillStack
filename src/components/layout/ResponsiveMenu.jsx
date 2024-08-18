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
  const { setTheme } = useTheme()
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!userData ? (
            <DropdownMenuLabel>
            <Button variant={"outline"} className="w-full" onClick={() => signIn()}>SignIn</Button>
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel>Hello {userData}</DropdownMenuLabel>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/projects"}>Projects</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/skills"}>Skills</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex items-center gap-1.5">
            <Button variant={"outline"} className="w-full" onClick={() => setTheme("dark")}>
                <Moon className="w-4"/>
            </Button>
            <Button variant={"outline"} className="w-full" onClick={() => setTheme("light")}>
                <Sun className="w-4"/>
            </Button>
            <Button variant={"outline"} className="w-full" onClick={() => setTheme("default")}>
                <MonitorCog className="w-4"/>
            </Button>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button variant={"outline"} className="bg-red-100 border border-red-200 text-red-400 w-full" onClick={() => signOut()}>Logout</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ResponsiveMenu;
