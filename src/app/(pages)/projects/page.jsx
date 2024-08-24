"use client";

import { GlobalLoader } from "@/components/layout/GlobalLoader";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";


const Projects = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <GlobalLoader loading={true} />;
  }
  return (
    <div className="md:h-[30rem] h-[40rem] w-full dark:bg-black bg-white relative pt-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-2.5 items-center">
          <h1 className="md:text-6xl text-5xl font-semibold">
            Type in your <span className="text-[#e2fd6c]">project</span>{" "}
            details.
          </h1>
          <p className="dark:text-white/50 text-black/50 px-2">
            Our AI would analyze the skiils from your description and create the
            required graphs for you.
          </p>
        </div>
        <div className="w-full">
          <Placeholder/>
        </div>
      </div>
    </div>
  );
};

const Placeholder=()=>{
  const [text,setText]=useState()
  const placeholders = [
    "Tell us about that cool app you built. What did it do? How'd you make it?",
    "Remember that time you fixed a tricky bug? What happened?",
    "Got a project you're proud of? What made it awesome?",
    "Ever lead a team or teach someone something new? How'd it go?",
    "What's the most interesting problem you've solved lately?"
  ];
 
  const handleChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value)
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };
  return (
    <div className="h-[10rem] flex flex-col items-start">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
export default Projects;
