import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

const NavbarMenu = ({ userData, status, className }) => {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <nav className={`hidden md:flex gap-6 ${className}`}>
      {status === "loading" ? (
        <></> // Show a loading state when fetching user data
      ) : userData ? (
        <div className="flex gap-12 items-center font-medium">
          <Link href={`/dashboard/${userData?.user.name}`}>Profile</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/skills">Skills</Link>
        </div>
      ) : (
        <Button
          className="bg-[#e2fd6c] border hover:border-[#dcff41] text-[#000] hover:text-white hover:bg-black w-full"
          onClick={() => router.push("/signin")}
          variant="outline"
        >
          Sign In
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
    </nav>
  );
};

export default NavbarMenu;
