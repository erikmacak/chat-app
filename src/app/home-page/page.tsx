"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { hasUserNickname } from "../../../repositories/user/userRepository";

import SignOut from "../../../components/auth/SignOut";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter()

  useEffect(() => {
    const checkNicknameStatus = async () => {
      if (!authLoading && user) {
        const hasNickname = await hasUserNickname(user.uid);
        if (!hasNickname) {
          router.push("/create-nickname");
        }
      } else if (!authLoading && !user) {
        router.push("/");
      }
    };

    checkNicknameStatus();
  }, [authLoading, user, router]);

  if (authLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-screen flex flex-col sm:flex-row-reverse bg-gradient-to-b from-indigo-600 to-indigo-400 text-white">

      <aside
        className={`
          fixed top-0 right-0 h-full bg-white text-indigo-900 z-50 
          flex flex-col justify-between shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "w-full sm:w-64 translate-x-0" : "w-full sm:w-64 translate-x-full sm:translate-x-0"}
          sm:static sm:h-auto
        `}
      >
        <div>
          <div className="p-8 flex items-center justify-between relative">
            <h2 className="text-xl font-bold text-center w-full">CHATS</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-8 sm:hidden text-indigo-900 text-2xl"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="flex justify-center p-4">
          <SignOut />
        </div>
      </aside>

      <section className="flex-1 p-4 sm:p-8 flex items-start sm:items-center justify-center">
        <div className="flex items-center max-w-md w-full">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for users"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-transparent border border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
          </div>

          <button
            className="sm:hidden text-white text-2xl ml-4"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </section>
    </main>
  );
}