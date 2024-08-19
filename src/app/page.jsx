import Header from "@/components/layout/Header";
import { MainSection } from "@/components/layout/MainSection";

export default function Home() {
  return (
    <div className="h-screen font-anek bg-white dark:bg-[#000]">
      <Header/>
      <MainSection/>
    </div>
  );
}
