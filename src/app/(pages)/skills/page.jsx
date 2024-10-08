"use client";

import { GlobalLoader } from "@/components/layout/GlobalLoader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Blocks, GaugeIcon, RotateCcwIcon, SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Skills = () => {
  const [progress, setProgress] = useState();
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session && status === "unauthenticated") {
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
      return;
    }

    const fetchSkills = async () => {
      setProgress(0);
      const response = await fetch("/api/skills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // const parsedSkills = JSON.parse(data.text); // Parse the JSON string
      // setSkills(parsedSkills);
      setSkills(data.text);
      setProgress(99);
    };

    if (session) {
      fetchSkills();
    }
  }, [session, status, router]);

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: session, values: values }),
      });
      if (response.ok) {
        toast({
          title: "We were correct about your insights.",
          description: "The insights extracted by us were successfully saved.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to save insights.",
          description:
            "An error occurred while trying to save your insights. Please try again.",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Failed to save insights.",
        description:
          "An error occurred while trying to save your insights. Please try again.",
      });
    }
  };

  if (status === "loading") {
    return <GlobalLoader loading={true} />;
  }
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative pt-[6rem]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="md:text-6xl text-5xl font-semibold">
            {session ? (
              <span className="text-[#e2fd6c]">{session?.user?.name}</span>
            ) : (
              <span className="">Anonymous</span>
            )}
            , the skills you have now!
          </h1>
          <p className="dark:text-white/50 text-black/50 px-2">
            This is the collection of skills that our skill analyzer extracted
            from your description.
          </p>
        </div>
        <SearchSkillsContainer skill={skills} />
        {!skills && (
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <p className="text-sm">Getting your skills...</p>
            <Progress value={progress} className="w-[30%] h-[.5rem] bg-black" />
          </div>
        )}
        {skills && <SkillContainer skill={skills} onSubmit={onSubmit} />}
      </div>
    </div>
  );
};

export default Skills;

const SkillContainer = ({ skill, onSubmit }) => {
  return (
    <div className="">
      <h1 className="text-4xl text-center">Your Skills</h1>
      <HoverEffect items={skill} onSubmit={onSubmit} />
    </div>
  );
};


const SearchSkillsContainer = ({ skill }) => {
  const [searchSkill, setSearchSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState("");

  // Get unique categories and proficiencies
  const uniqueCategories = [...new Set(skill?.map((s) => s.general_category))];
  const uniqueProficiencies = [...new Set(skill?.map((s) => s.proficiency))];

  // Filter skills based on search input, category, and proficiency
  const filteredSkills = skill?.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchSkill.toLowerCase());
    const matchesCategory = selectedCategory ? s.general_category === selectedCategory : true;
    const matchesProficiency = selectedProficiency ? s.proficiency === selectedProficiency : true;

    return matchesSearch && matchesCategory && matchesProficiency;
  });

  return (
    <form>
      <div className="w-full flex items-center gap-2">
        {/* Search Input */}
        <Input
          placeholder="Search for your skills..."
          id="search"
          type="text"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
        />

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="w-4" />
              <p className="hidden md:block">Filter</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="dark:bg-black bg-white dark:border-white/20 border-gray-400">
            {/* Filter by Category */}
            <div className="flex items-center justify-between">
              <Label>By Category</Label>
              {
                (selectedCategory || selectedProficiency) && (
                  <Button onClick={() => {
                    setSelectedCategory("")
                    setSelectedProficiency("")
                  }}
                    className="h-6"
                  >
                    <span className="flex items-center gap-1">
                      <RotateCcwIcon className="w-4" />
                      <p className="">Reset</p>
                    </span>
                  </Button>
                )
              }
            </div>
            <Separator className=" bg-white/20 mt-1 mb-2" />
            {uniqueCategories.map((category, index) => (
              <div className="flex items-center gap-1 mb-4" key={index}>
                <Checkbox
                  id="category"
                  checked={selectedCategory === category}
                  onCheckedChange={() => setSelectedCategory(category)}
                />
                <Label htmlfor="category">{category}</Label>
              </div>
            ))}
            <Separator className="dark:bg-black bg-white dark:border-white/20 border-gray-400" />

            {/* Filter by Proficiency */}
            <Label>By Proficiency</Label>
            <Separator className="bg-white/20 mt-1 mb-2" />
            {uniqueProficiencies.map((proficiency, index) => (
              <div className="flex items-center gap-1" key={index}>
                <Checkbox
                  id="proficiency"
                  checked={selectedProficiency === proficiency}
                  onCheckedChange={() => setSelectedProficiency(proficiency)}
                />
                <Label htmlfor="proficiency">
                  {proficiency === 5 ? "Beginner" : proficiency === 10 ? "Intermediate" : "Advanced"}
                </Label>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Filtered Results */}
      {
        (searchSkill.length > 0 || selectedCategory || selectedProficiency) && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {filteredSkills?.map((filteredSkill, index) => (
              <div key={index} className="p-4 bg-[#e2fd6c] rounded-lg">
                <p className="text-2xl font-semibold text-black">{filteredSkill.name}</p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Blocks className="text-black w-4"/>
                    <p className="text-black capitalize">{filteredSkill.general_category}</p>
                  </span>
                  <Separator  orientation="vertical"/>
                  <span className="flex items-center gap-1">
                    <GaugeIcon className="text-black w-4" />
                    <p className="text-black capitalize">{filteredSkill.proficiency === 5 ? "Beginner" : filteredSkill.proficiency === 10 ? "Intermediate" : "Advanced"}</p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </form>
  );
};
