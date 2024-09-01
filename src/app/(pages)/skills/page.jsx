"use client";

import { GlobalLoader } from "@/components/layout/GlobalLoader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const [progress, setProgress] = useState();
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState();
  // const [newSkill,setNewSkill]=useState()
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
      setSkills(data.text);
      setProgress(99);
    };

    if (session) {
      fetchSkills();
    }
  }, [session, status, router]);

  const onSubmit = async (values) => {
    const response = await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: session, values: values }),
    });
    console.log(await response.json());
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
        {!skills && (
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <p className="text-sm">Getting your skills...</p>
            <Progress value={progress} className="w-[30%] h-[.5rem]" />
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
      <HoverEffect items={skill} onSubmit={onSubmit} />
    </div>
  );
};
