import React from 'react'
import  { CanvasReveal } from './FeatureCard'

const FeatureSection = () => {
  return (
    <div className='h-[40rem] w-full dark:bg-black bg-white relative pt-12'>
        <div className="max-w-6xl mx-auto flex flex-col gap-4 px-4">
            <h1 className="md:text-[3rem] text-[2rem]">Unlock the Power of Your Experience</h1>
        </div>
        <div className="bg-white dark:bg-black">
            <CanvasReveal/>
        </div>
    </div>
  )
}

export default FeatureSection