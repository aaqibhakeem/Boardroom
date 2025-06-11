import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardroom",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <body className={`${inter.className} overflow-x-hidden max-w-full`}>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children} 
              <ToastContainer position="bottom-right" theme="dark" />
            </ThemeProvider>
          </body>
        </html>
    </ClerkProvider>
  );
}