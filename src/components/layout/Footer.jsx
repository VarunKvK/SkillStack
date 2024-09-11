import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-auto w-full bg-[#e2fd6c] relative mt-[10rem]">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-4 px-4">
        <div className="">

        </div>
        <Link
          href={"/"}
          className="font-bold text-[4rem] sm:text-[6rem] md:[7rem] lg:text-[14rem] xl:text-[16rem] text-black"
        >
          SkillStack
        </Link>
        <p className="text-sm text-black">© 2024 SkillStack. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
