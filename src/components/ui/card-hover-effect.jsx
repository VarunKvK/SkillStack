import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const HoverEffect = ({ items, className, onSubmit }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10",
        className
      )}
    >
      <div className="relative group  block p-2 h-full w-full">
        <AddSkills onSubmit={onSubmit}/>
      </div>
      {items.map((item, idx) => (
        <div
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#e2fd6c67] dark:bg-[#e2fd6c67] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.general_category}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden dark:bg-black bg-white border border-transparent border-gray-300 dark:border-white/[0.2] group-hover:border-[#e2fd6c] relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-black dark:text-white font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-black/50 dark:text-gray-300 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 characters" }),
  general_category: z.string().min(2, { message: "Category should have at least 2 characters" }),
});

const AddSkills = ({onSubmit}) => {
  const form =useForm({
    resolver:zodResolver(formSchema),
    defaultValues: {
      name: '',
      general_category: ''
    }
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl h-full w-full p-4 dark:bg-black dark:border-white/50 border-gray-400 "
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white dark:border-white/50 border-gray-40/0">
        <DialogHeader>
          <DialogTitle>Add skills</DialogTitle>
          <DialogDescription>
            Add more skills if you have any. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="You can add more skills..."
                className=""
                />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="general_category" className="text-left">
                Category
              </Label>
              <Input
                {...form.register("general_category")}
                id="general_category"
                placeholder="Add what category it fits in..."
                className=""
              />
            </div>
          </div>
          <div className="flex items-end justify-end w-full">
          <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
