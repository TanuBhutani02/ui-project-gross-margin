import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage projects and financials",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${gabarito.variable} bg-gray-50 text-gray-900  overflow-y-auto`}>
      <AuthProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
      </AuthProvider>
       
      </body>
    </html>
  );
}
