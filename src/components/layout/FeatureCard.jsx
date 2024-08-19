"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { BrainCircuit, ChartSpline, Share2, Shrub } from "lucide-react";

export function CanvasReveal() {
    const feature_data=[
        {
            title:"Automatic Skill Extraction",
            description:"Our AI analyzes your project descriptions to identify and catalog your skills automatically.",
            icon:<BrainCircuit className="w-16 h-16"/>,
            color:['#cbe35f','#a9bd44','#879729'],
            bg:"bg-[#e2fd6c]"
        },
        {
            title:"Visual Skill Representation",
            description:"Transform your skills into stunning, interactive charts that capture attention and convey your expertise at a glance.",
            icon:<ChartSpline className="w-16 h-16"/>,
            bg:"bg-[#00e5ff]",
            color:['#f2ffb3','#bed800','#ff7043']
        },
        {
            title:"Track Your Growth",
            description:"Watch your skills evolve over time as you add new projects and experiences.",
            icon:<Shrub className="w-16 h-16"/>,
            bg:"bg-[#ff7043]",
            color:['#ffab91','#d84315','#99ab00']
        },
        {
            title:"Easy Sharing",
            description:"Generate shareable links or images of your skill visualizations to enhance your portfolio or resume.",
            icon:<Share2 className="w-16 h-16"/>,
            bg:"bg-[#ec407a]",
            color:['#c5cae9','#3f51b5','#283593']
        },
    ]
  return (
    <>
      <div className="max-w-6xl py-20 flex flex-col md:grid md:grid-cols-2 lg:flex-row lg:flex items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
        {feature_data.map((f,index)=>(
        <Card title={f.title} icon={f.icon} description={f.description} key={index}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName={f.bg}
            colors={f.color}
          />
        </Card>
        ))}
        
      </div>
    </>
  );
}

const Card = ({
  title,
  icon,
  description,
  children,
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-2xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <h2 className="dark:text-white text-lg md:text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {description}
        </h2>
      </div>
    </div>
  );
};


export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
