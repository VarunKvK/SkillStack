import React from "react";
import { FlipWords } from "../ui/flip-words";

export function MainSection() {
  const words = ["Visualize", "Illuminate", "Chart", "Showcase", "Transform"];

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="md:text-[6rem] text-[3.5rem] leading-[2rem]">
          <FlipWords words={words} className={"font-semibold"} />
          <br />
          <span className="leading-[0.2rem] opacity-80">
            <span className="md:text-[3rem] text-[1.8rem] px-4">
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
      </div>
    </div>
  );
}
