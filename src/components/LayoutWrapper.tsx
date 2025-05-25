"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { Header } from "./Header";



export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/login"; 
  const { isAuthenticated } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState( false);
  
  
  // if(!isAuthenticated && !isAuthPage ){
  //   return null;
  // }

  // if(isAuthPage){
  //   return <>{children}</>
  // }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
       
        <main
          className={`flex-1 mt-8 p-6 transition-all duration-300 ${
            isAuthenticated ? (isSidebarOpen ? "ml-64" : "ml-20") : "ml-0"
          }`}
        >
          {children}
        </main>
        
      </div>
    </div>
  );
}
