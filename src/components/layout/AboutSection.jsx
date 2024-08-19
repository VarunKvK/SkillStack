import React from "react";

const AboutSection = () => {
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white relative pt-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        <h1 className="md:text-[3rem] text-[2rem]">
          What is
          <span className="font-semibold text-[2.5rem] md:text-[3.5rem] text-[#e2fd6c]"> SkillStack</span>?
        </h1>
        <p className="px-2 leading-[1.4rem] md:text-2xl opacity-70">
          SkillStack is your personal skill visualization tool. It transforms your
          project experiences into a dynamic, visual representation of your
          professional capabilities.
        </p>
        <p className="px-2 leading-[1.4rem] md:text-2xl opacity-70">
          Whether you&apos;re a job seeker, freelancer, or professional looking to
          track your growth, SkillStack helps you showcase your skills in a
          compelling, data-driven way.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
