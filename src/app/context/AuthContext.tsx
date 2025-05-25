"use client"; // Required for Next.js App Router

import { LoginPayload, User, userService } from "@/services/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";


interface AuthContextType {
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  handleUserDetails: (data: any) => void;
  menuItems: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // let menuItems: { name: string; icon: JSX.Element; path: string }[] = [
  //   { name: "Dashboard", icon: iconMap["dashboard"], path: "/dashboard" },
  //   { name: "Update", icon: iconMap["update"], path: "/update" },
  //   { name: "Reports", icon: iconMap["reports"], path: "/reports" },
  //   { name: "Financials", icon: iconMap["financials"], path: "/financials" },
  // ].filter(item => item.name);

  useEffect(() => {
    //const token = localStorage.getItem("token");
    //if (token) fetchUserDetails(token);
    // else {
    //   setLoading(false);
    //   logout();
    // }
  }, []);

  const fetchUserDetails = async (token: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Invalid token");

      const data = await response.json();
      setUser({ ...data, token });
    } catch (error) {
      console.error("Auto-login failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginPayload: LoginPayload) => {
    try {
      setLoading(true);
      const authorizedUserResult = await userService.getAuthorizedUser(loginPayload);
      handleUserDetails(authorizedUserResult);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDetails = async (data: any) => {
    setUser(data);
    localStorage.setItem("token", JSON.stringify(data));
    const menuItems = await userService.getRoleMenus(+data.role);
    setMenuItems(menuItems);
    console.log('menuItems = ', menuItems);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    redirect("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: true, loading, handleUserDetails, menuItems }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
