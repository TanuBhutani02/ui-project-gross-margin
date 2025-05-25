"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, user, login , loading, handleUserDetails} = useAuth();
  const router = useRouter();

  const ADMIN_EMAIL = process.env.TEMP_EMAIL || "";
  const ADMIN_PASSWORD = process.env.TEMP_PASSWORD || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sbmit call ',);
    const authorizedUserResult = await userService.getAuthorizedUser({email, password});
    handleUserDetails(authorizedUserResult);

  if(authorizedUserResult){
    router.push("/dashboard");
  }
  };

useEffect(()=>{
  if(user){
    router.push("/dashboard");
  }
},[user])

  let AuthenticationProgress;
  if(loading){
    AuthenticationProgress = (
      <div className="w-full h-1 bg-blue-500">
        <div className="h-full bg-blue-700 animate-progress"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        {AuthenticationProgress}
        <div className="text-center">
          <div className="flex justify-center">
            {/* logo */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold font-gabarito">
                G
              </span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-gabarito">
            Gross Margin Pro
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-gabarito">
            Sign in to your account (admin)
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 font-gabarito"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 text-[#18181B] bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 font-gabarito"
                placeholder="Admin user email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 font-gabarito"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 text-[#18181B] bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 font-gabarito"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-gabarito">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 font-gabarito"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
