import React from "react";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";

export function MainSection() {
  const words = [
    "Visualize",
    "Illuminate",
    "Chart",
    "Showcase",
    "Design",
    "Transform",
    "Unfold",
    "Portray",
    "Spotlight",
  ];

  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(circle,transparent_20%,black)]"></div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="md:text-[6rem] text-[3.5rem] leading-[2.4rem] ">
          <FlipWords words={words} className={"font-semibold"} />
          <br />
          <span className="leading-[0.1rem] opacity-80">
            <span className="md:text-[3rem] text-[1.8rem] px-4 ">
              your professional growth
            </span>
            <br />
            <span className="md:text-[3rem] text-[1.8rem] px-4">
              with skillstack
            </span>
          </span>
        </h1>
        <p className="px-4 text-sm opacity-40">
          Turn your projects into a powerful skill portfolio
        </p>
        <div className="px-4 flex items-center gap-8">
          <Link href={"/"} className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#9afd6c_30%,#d6ff1e_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg dark:bg-black bg-white px-3 py-1 text-sm font-medium dark:text-white text-black backdrop-blur-3xl">
              Get Started
            </span>
          </Link>
          <Link href={"/"}>Learn More</Link>
        </div>
      </div>
    </div>
  );
}
