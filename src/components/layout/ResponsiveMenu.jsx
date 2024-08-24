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
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const ResponsiveMenu = ({ userData, status }) => {
  const { setTheme } = useTheme();
  const router= useRouter()
  return (
    <nav className="block md:hidden">
      <DropdownMenu>
        {status !=="loading" && (
          <DropdownMenuTrigger aria-label="Open menu">
            <Menu />
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent className="mr-4 bg-white dark:bg-black dark:border-[#1d1d1d]">
          {!userData ? (
            <DropdownMenuLabel>
              <Button
                variant="outline"
                className="bg-[#e2fd6c] dark:border-[#1d1d1d] text-black w-full"
                onClick={()=>router.push("/signin")}
              >
                Sign In
              </Button>
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel>
              Hello, {userData.user.name || "User"}
            </DropdownMenuLabel> // Use name or fallback
          )}
          <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#1d1d1d]" />

          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href="/dashboard">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href="/projects">Projects</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#f1f1f1] focus:dark:bg-[#000]">
            <Link href="/skills">Skills</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#1d1d1d]" />

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              className="w-full bg-[#eaeaea] dark:bg-black dark:border-[#1d1d1d]"
              onClick={() => setTheme("dark")}
              aria-label="Activate dark mode"
            >
              <Moon className="w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#eaeaea] dark:bg-black dark:border-[#1d1d1d]"
              onClick={() => setTheme("light")}
              aria-label="Activate light mode"
            >
              <Sun className="w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#eaeaea] dark:bg-black dark:border-[#1d1d1d]"
              onClick={() => setTheme("default")}
              aria-label="Activate system default mode"
            >
              <MonitorCog className="w-4" />
            </Button>
          </div>

          {userData && (
            <>
              <DropdownMenuSeparator className="bg-[#e4e4e4] dark:bg-[#1d1d1d]" />
                <Button
                  className="bg-[#fd6c6c] hover:bg-[#df5f5f] text-white w-full"
                  onClick={signOut}
                >
                  Logout
                </Button>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default ResponsiveMenu;
