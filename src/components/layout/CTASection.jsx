import React from 'react'
import { BackgroundBeams } from '../ui/background-beams'

const CTASection = () => {
  return (
    <div className="h-auto w-full dark:bg-black bg-white relative pt-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
            <CTA/>
        </div>
    </div>
  )
}

export default CTASection

const CTA=()=>{
    return(
        <div className="h-[40rem] w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-6xl text-white text-center font-sans font-bold">
          Ready to Showcase Your True 
          <span className='text-[#e2fd6c]'> Potential</span>?
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Join us to stand out with SkillStack
          </p>
          <input
            type="text"
            placeholder="hi@manuarora.in"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
          />
        </div>
        <BackgroundBeams />
      </div>
    )
}