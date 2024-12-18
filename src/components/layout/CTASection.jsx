import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import Link from "next/link";

const CTASection = ({ session, status }) => {
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white relative pt-[10rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        <CTA title={session ? "Get started" : "Create a free account"} session={session} />
      </div>
    </div>
  );
};

export default CTASection;

const CTA = ({ title, session }) => {
  return (
    <div className="md:h-[30rem] h-[20rem] w-full rounded-md bg-black dark:bg-white relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center justify-center gap-4 z-20">
        <div className="">
          <h1 className="relative z-10 text-3xl md:text-6xl text-white dark:text-black text-center font-sans font-bold">
            Ready to Showcase Your True
            <span className="text-[#e2fd6c]"> Potential</span>?
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Join us to stand out with SkillStack
          </p>
        </div>
        <Link
          href={session ? "/projects":"/signin"}
          className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px]"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#9afd6c_30%,#d6ff1e_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {title}
          </span>
        </Link>
      </div>
      <BackgroundBeams />
    </div>
  );
};
