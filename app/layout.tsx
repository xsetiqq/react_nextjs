import type { Metadata } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";

import { ReduxProvider } from "@/components/shared/ReduxProvider";
import { Toaster } from "react-hot-toast";

const kanitSans = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const interMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "SnikersPL",
  description: "Store for the best sneakers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanitSans.variable} ${interMono.variable} bg-blue-100 antialiased`}
      >
        <ReduxProvider>
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <main className="min-h-screen flex justify-center items-start p-4 md:p-6">
            <div className="bg-white w-full max-w-screen-xl rounded-xl shadow-md">
              <Header />
              <div className="p-4 md:p-8">{children}</div>
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
