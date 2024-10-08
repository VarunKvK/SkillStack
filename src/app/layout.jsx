import { Providers } from "./providers";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "SkillStack",
  description: "Visualize Your Professional Growth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
      <Header/>
            {children}
            <Toaster/>
            </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
