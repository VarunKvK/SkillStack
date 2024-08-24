import { cn } from "@/lib/utils";
import { BrainCog, ExternalLink, Target } from "lucide-react";

 
export function Steps() {
  const steps = [
    {
      title: "Add Your Projects",
      description:
        "Describe your professional experiences.",
      icon: <Target/>,
    },
    {
      title: "Let AI Do the Work",
      description:
        "Our system extracts and categorizes your skills.",
      icon: <BrainCog/>
    },
    {
      title: "Visualize & Share",
      description:
        "See your skills come to life in interactive charts.",
      icon: <ExternalLink/>,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 py-10 max-w-6xl mx-auto">
      {steps.map((step, index) => (
        <StepsContainer key={step.title} {...step} index={index} />
      ))}
    </div>
  );
}
 
const StepsContainer = ({
  title,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/steps dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/steps:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/steps:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/steps:h-12 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/steps:bg-[#e2fd6c] transition-all duration-200 origin-center" />
        <span className="group-hover/steps:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};