import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const NavbarMenu = ({ userData, status }) => {
  return (
    <div>
      {userData ? (
        <div className="flex gap-12 items-center">
          <Link href={"/dashboard"}>Profile</Link>
          <Link href={"/projects"}>Projects</Link>
          <Link href={"/skills"}>Skills</Link>
        </div>
      ) : (
        <Button onClick={() => signIn()} variant={"outline"}>
          SignIn
        </Button>
      )}
    </div>
  );
};

export default NavbarMenu;
