"use client"

import AboutSection from "@/components/layout/AboutSection";
import CTASection from "@/components/layout/CTASection";
import FeatureSection from "@/components/layout/FeatureSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { MainSection } from "@/components/layout/MainSection";
import MyMockups from "@/components/layout/MyMockups";
import WorkSection from "@/components/layout/WorkSection";
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
      <WorkSection/>
      <CTASection/>
      <MyMockups/>
      <Footer/>
    </div>
  );
}
