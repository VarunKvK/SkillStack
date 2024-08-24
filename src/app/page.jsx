"use client";

import AboutSection from "@/components/layout/AboutSection";
import CTASection from "@/components/layout/CTASection";
import FeatureSection from "@/components/layout/FeatureSection";
import Footer from "@/components/layout/Footer";
import { GlobalLoader } from "@/components/layout/GlobalLoader";
import Header from "@/components/layout/Header";
import { MainSection } from "@/components/layout/MainSection";
import MyMockups from "@/components/layout/MyMockups";
import WorkSection from "@/components/layout/WorkSection";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const postUserData = async () => {
        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: session?.user.name,
              email: session?.user.email,
              image: session?.user.image,
            }),
          });

          if (!response.ok) {
            console.error("Failed to add the user data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };

    postUserData();
  }, [status, session]);

  if(status ==="loading"){
    return <GlobalLoader loading={true}/>
  }

  return (
    <div className="h-screen font-anek bg-white dark:bg-[#000]">
      <MainSection session={session} status={status} />
      <AboutSection />
      <FeatureSection />
      <WorkSection />
      <CTASection session={session} status={status} />
      <MyMockups />
      <Footer />
    </div>
  );
}
