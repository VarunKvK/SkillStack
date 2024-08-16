import { Providers } from "./providers";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

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
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
