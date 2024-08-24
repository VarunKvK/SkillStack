"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { useSession } from "next-auth/react";

const loadingStates = [
  {
    text: "Illuminate Your Professional Growth",
  },
  {
    text: "Map Your Professional Journey",
  },
  {
    text: "Chart Your Career Evolution",
  },
  {
    text: "Showcase Your Skill Progression",
  },
  {
    text: "Bring Your Expertise to Life",
  },
  {
    text: "Transform Your Experience into Insight",
  },
  {
    text: "Craft Your Skill Narrative",
  },
  {
    text: "Unfold Your Professional Story",
  },
];

export function GlobalLoader({loading}) {

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
