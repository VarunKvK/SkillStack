"use client";

import { GlobalLoader } from "@/components/layout/GlobalLoader";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Badge } from "@/components/ui/badge";
import { AwardIcon, BookAIcon, CrosshairIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const { data, status } = useSession();
  const [text, setText] = useState();
  const [skills, setSkills] = useState();
  const [analyzing, setAnalyzing] = useState(false);

  const placeholders = [
    "Tell us about that cool app you built. What did it do? How'd you make it?",
    "Remember that time you fixed a tricky bug? What happened?",
    "Got a project you're proud of? What made it awesome?",
    "Ever lead a team or teach someone something new? How'd it go?",
    "What's the most interesting problem you've solved lately?",
  ];

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectDescription: text }),
      });
      const data = await response.json();
      try {
        // const parsedSkills = JSON.parse(data.text); // Parse the JSON string
        // setSkills(parsedSkills);
        setSkills(data.text);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      console.log("Analysis:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAnalyzing(false);
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
            Type in your <span className="text-[#e2fd6c]">project</span>{" "}
            details.
          </h1>
          <p className="dark:text-white/50 text-black/50 px-2">
            Our AI would analyze the skills from your description and create the
            required graphs for you.
          </p>
        </div>
        <div className="w-full relative">
          <Placeholder
            placeholders={placeholders}
            handleChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
        {analyzing && <div className="w-full text-center">Analyzing...</div>}
        {skills && <ResultContainer data={data} skills={skills} />}
      </div>
    </div>
  );
};

//A custom placeholder created using ShadCN UI and Acentricity UI.
const Placeholder = ({ placeholders, handleChange, onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

//This is the modal that gives out the result when the description has been analyzed by GEMINI.
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ResultContainer = ({ data, skills }) => {
  const [insights, setInsights] = useState(skills);
  console.log(data)
  async function postInsights(){
    const response=await fetch("/api/projects",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        skills,data
      })
    })
  }

  function onContinue() {
    // Cancel the insights
    setInsights([]);
    // You can also add navigation or any other action here
    console.log("Insights have been cancelled.");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <div className="w-full flex flex-col items-center gap-4 mb-[6rem]">
      <h1 className="text-2xl font-semibold">
        {data.user?.name}, Your
        <span className="text-[#e2fd6c]"> Project Insights</span>
      </h1>
      <div className="grid">
        {insights.map((s, index) => (
          <CardSpotlight
            key={index}
            className="rounded-xl flex flex-col gap-4 relative"
          >
            <div className="w-full flex justify-between items-center z-20 relative">
              <div className="flex flex-col gap-.5">
                <h2 className="opacity-50">Project Type</h2>
                <p className="text-xl font-semibold">
                  {s.projectInsights.projectType}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-.5 z-20 relative">
              <h2 className="opacity-50">Project Purpose</h2>
              <p className="text-xl font-semibold">
                {s.projectInsights.purpose}
              </p>
            </div>
            <div className="flex flex-col gap-.5 z-20 relative">
              <h2 className="opacity-50">Key Challenges</h2>
              <div className="flex flex-col gap-1">
                {s.projectInsights.challenges?.map((c, index) => (
                  <p
                    className="flex items-center gap-1 text-md font-semibold"
                    key={index}
                  >
                    <CrosshairIcon className="w-4 opacity-25" />
                    {c.description}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 z-20 relative">
              <h2 className="opacity-50">Skills Identified</h2>
              <div className="flex flex-wrap gap-1">
                {s.projectInsights.skills.map((s, index) => (
                  <Badge variant={"outline"} key={index} className="flex gap-2">
                    <span>{s.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:justify-center justify-start gap-4 md:gap-0">
              <div className="flex flex-col gap-1 z-20 relative">
                <h2 className="opacity-50">Features Implemented</h2>
                <div className="flex flex-col gap-1">
                  {s.projectInsights.features?.map((f, index) => (
                    <p
                      className="flex items-center gap-1 text-md font-medium"
                      key={index}
                    >
                      <AwardIcon className="w-4 opacity-25" />
                      {f.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 z-20 relative">
                <h2 className="opacity-50">Learnings</h2>
                <div className="flex flex-col gap-1">
                  {s.projectInsights.learnings?.map((l, index) => (
                    <p
                      className="flex items-center gap-1 text-md font-medium"
                      key={index}
                    >
                      <BookAIcon className="w-4 opacity-25" />
                      {l.description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center relative z-20 mt-6 gap-2">
              <Button onClick={postInsights} className="w-full bg-[#e2fd6c] text-black hover:text-[#e2fd6c] dark:hover:text-black">
                Looks Good!
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full dark:bg-black bg-white border-white opacity-50 hover:opacity-100"
                  >
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-black bg-white w-[80%] md:w-full rounded-lg relative top-[10rem]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your insights.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="dark:bg-black bg-white dark:text-white text-black border-white" asChild>
                      <Button>
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={onContinue}>
                      Continue
                      </Button>
                      </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};
export default Projects;
