"use client"

import AboutSection from "@/components/layout/AboutSection";
import FeatureSection from "@/components/layout/FeatureSection";
import Header from "@/components/layout/Header";
import { MainSection } from "@/components/layout/MainSection";
import { useSession } from "next-auth/react";

// [#e2fd6c]
export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div className="h-screen font-anek bg-white dark:bg-[#000]">
      <Header session={session} status={status}/>
      <MainSection/>
      <AboutSection/>
      <FeatureSection/>
    </div>
  );
}
