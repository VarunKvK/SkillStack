import React from "react";
import { FlipWords } from "../ui/flip-words";

export function MainSection() {
  const words = ["Visualize", "Illuminate", "Chart", "Showcase", "Transform"];

  return (
    <div className="w-full px-2 h-full flex items-center">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="md:text-[6rem] text-[3.5rem] leading-[2rem]">
          <FlipWords words={words} className={"font-semibold"} />
          <br />
          <span className="leading-[0.2rem]">
            <span className="md:text-[3rem] text-[1.8rem] px-4">
              your professional growth
            </span>
            <br />
            <span className="md:text-[3rem] text-[1.8rem] px-4">
              with skillstack
            </span>
          </span>
        </h1>
        <p className="px-4 text-sm opacity-40">Turn your projects into a powerful skill portfolio</p>
      </div>
    </div>
  );
}
