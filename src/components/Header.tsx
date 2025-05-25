import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react";

export function Header(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {user , logout} = useAuth();
      
    return (
        <header className="bg-gray-900 text-white h-14 z-50 flex justify-end items-center fixed top-0 left-0 w-full">
        <div className="relative flex items-center  space-x-4 m-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none items-center"
            >
              <div className="hidden md:block"></div>
                <div className="text-xl font-semibold rounded-full bg-red-600  p-2 w-10 h-10 flex items-center justify-center">
                  {"Tanu".charAt(0).toUpperCase()}
                </div>
                
            </button>
         
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg z-20">
                <div className="py-2">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
         
          <div className="ml-auto">
            <span className="text-sm font-semibold">{user?.name}</span>
          </div>
          </div>
        </header>
    );
}