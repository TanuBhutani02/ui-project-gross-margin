"use client";

import { JSX, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX, FiGrid, FiRefreshCw, FiBarChart, FiFileText, FiLogOut } from "react-icons/fi";
import { FcBusinessman } from "react-icons/fc";
import { FaProjectDiagram as FontAwesomeIcon } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const router = useRouter();
  const currentPath = usePathname(); // Get current path using usePathname

  const iconMap: { [key: string]: JSX.Element } = {
    dashboard: <FiGrid size={20} />,
    projects: <FontAwesomeIcon size={20} />,
    update: <FiRefreshCw size={20} />,
    reports: <FiFileText size={20} />,
    financials: <FiBarChart size={20} />,
    employee: <FcBusinessman size={20} />,
  };

  let menuItems: { name: string; icon: JSX.Element; path: string }[] = [
    { name: "Dashboard", icon: iconMap["dashboard"], path: "/dashboard" },
    { name: "Projects", icon: iconMap["projects"], path: "/projects" },
    { name: "Update", icon: iconMap["update"], path: "/update" },
    { name: "Reports", icon: iconMap["reports"], path: "/reports" },
    { name: "Financials", icon: iconMap["financials"], path: "/financials" },
    { name: "Employees", icon: iconMap["employee"], path: "/employees" },
  ].filter(item => item.name);

  // Function to check if the item is active
  const isActive = (path: string) => currentPath === path;

  return (
    <aside
      className={`z-30 fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-20"
        }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6">
        {isOpen && <h1 className="text-xl font-bold font-gabarito">Gross Margin Pro</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-xl font-bold font-gabarito">G</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 z-10000 overflow-hidden sticky top-0">
        {menuItems.map((item: any) => (
          <button
            key={item.name}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-left hover:bg-blue-700 transition ${isActive(item.path) ? "bg-blue-600" : ""}`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            {isOpen && <span className={`font-gabarito ${isActive(item.path) ? "text-white" : "text-gray-300"}`}>{item.name}</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="flex items-center gap-3 w-full p-3 rounded-lg text-left bg-red-600 hover:bg-red-700 transition"
          onClick={() => router.push("/login")}
        >
          <FiLogOut size={20} />
          {isOpen && <span className="font-gabarito">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
