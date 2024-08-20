import Image from "next/image";
import React from "react";

const MyMockups = () => {
  return (
    <div className="h-auto w-full dark:bg-black bg-white relative md:pt-[20rem] pt-[8rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
        {/* //!<Image src={""}/> //If aws was created then add them here */}
        <div className="">
          <h1 className="md:text-[3rem] text-[2rem] font-semibold">Elevate Your Projects with Premium Mockups</h1>
          <p className="px-1 leading-[1.4rem] md:text-2xl opacity-70">
          Looking to take your portfolio or presentations to the next level? Our curated collection of high-quality mockups is designed to help you showcase your work with style and professionalism.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="http://varuninverse.gumroad.com/"
            className="inline-block px-4 py-2 text-sm font-medium text-black rounded-md transition-colors duration-300 border hover:border-[#d6ff20] hover:bg-black bg-[#e2fd6c] hover:text-white"
          >
            Browse Our Mockup Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyMockups;
