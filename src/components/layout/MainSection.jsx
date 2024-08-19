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
    <div className="h-[40rem] w-full dark:bg-black bg-white  dark:bg-dot-[#e2fd6c] bg-dot-black/[0.5] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
      <div className="max-w-6xl mx-auto flex flex-col md:gap-8 gap-4 w-full">
        <h1 className="md:text-[8rem] text-[3.5rem] leading-[2.4rem] md:leading-[4rem] ">
          <FlipWords words={words} className={"font-semibold"} />
          <br />
          <span className="md:leading-2 leading-[0.1rem] opacity-90">
            <span className="md:text-[3.5rem] text-[1.6rem] px-4 sm:text-[2rem]">
              your professional growth
            </span>
            <br />
            <span className="md:text-[3.5rem] text-[1.6rem] px-4 sm:text-[2rem]">
              with skillstack
            </span>
          </span>
        </h1>
        <p className="px-4 text-sm md:text-2xl opacity-80">
          Turn your projects into a powerful skill portfolio
        </p>
        <div className="px-4 flex items-center gap-8">
          <Link href={"/"} className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#9afd6c_30%,#d6ff1e_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started
            </span>
          </Link>
          <Link href={"/"}>Learn More</Link>
        </div>
      </div>
    </div>
  );
}
