"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { GlobalLoader } from "@/components/layout/GlobalLoader";

const analysisSchema = z.object({
  projectType: z.string().min(1, "Project type is required."),
  purpose: z.string().min(1, "Project purpose is required."),
  challenges: z
    .array(z.string().max(30, "Challenges cannot exceed 30 characters"))
    .optional(),
});

const EditAnalysis = ({ skills, onUpdate }) => {
  const searchParams = useSearchParams();
  const skillInfo = searchParams.get("skillInfo");
  const [projectInsights, setProjectInsights] = useState(null);

  useEffect(() => {
    if (skillInfo) {
      try {
        const decodedData = JSON.parse(skillInfo);
        setProjectInsights(decodedData);
      } catch (error) {
        console.error("Failed to decode skillInfo:", error);
      }
    }
  }, [skillInfo]);

  if (!projectInsights) {
    return <GlobalLoader loading={true} />;
  }

  // Initialize the form only when projectInsights is available
  const form = useForm({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      projectType: projectInsights.projectType || "",
      purpose: projectInsights.purpose || "",
      challenges: projectInsights.challenges || [],
      skills: projectInsights.ability || [],
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Edit Analysis</h1>
      <form>
        <div className="mb-4">
          <Label htmlFor="type">Project Type</Label>
          <Input id="type" {...form.register("projectType")} />
        </div>
        <div className="mb-4">
          <Label htmlFor="purpose">Project Purpose</Label>
          <Input id="purpose" {...form.register("purpose")} />
        </div>
        {/* Add other form fields as needed */}
      </form>
    </div>
  );
};

export default EditAnalysis;
