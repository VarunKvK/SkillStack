import React from "react";
import { Steps } from "./WorkSteps";

const WorkSection = () => {
  return (
    <div className="h-auto w-full dark:bg-black bg-white relative pt-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        <h1 className="md:text-[3rem] text-[2rem]">Build Your SkillStack in<br/>3 Simple Steps</h1>
        <div className="bg-white dark:bg-black">
            <Steps/>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
