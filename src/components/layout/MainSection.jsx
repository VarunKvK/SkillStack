import React from "react";
import { FlipWords } from "../ui/flip-words";

export function MainSection() {
  const words = ["Visualize", "Illuminate", "Chart", "Showcase", "Transform"];

  return (
    <div className="w-full h-full px-4 flex items-center">
      <h1 className="md:text-[6rem] text-[5rem] leading-[2.5rem]">
        <FlipWords words={words} className={'font-semibold'}/>
        <br />
        <span className="leading-[0.1rem]">
        <span className="md:text-[3rem] text-[2rem] px-4">your professional growth</span>
        <br />
        <span className="md:text-[3rem] text-[2rem] px-4">with skillstack</span>
        </span>
      </h1>
    </div>
  );
}
