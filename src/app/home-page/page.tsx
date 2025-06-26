"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { User } from "../../../models/User";
import { hasUserNickname, getUsersByNicknamePrefix } from "../../../repositories/user/userRepository";

import { useDebounce } from "use-debounce";

import SignOut from "../../../components/auth/SignOut";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedQuery.trim() === "") {
        setFilteredUsers([]);
        return;
      }

      try {
        const users = await getUsersByNicknamePrefix(debouncedQuery);
        setFilteredUsers(users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  if (authLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-screen flex flex-col sm:flex-row-reverse bg-gradient-to-b from-indigo-600 to-indigo-400 text-white">
      <aside
        className={`
          h-screen w-full sm:w-64 bg-white text-indigo-900 z-50 
          flex flex-col shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-full sm:translate-x-0"}
          fixed sm:static top-0 right-0
        `}
      >
        <div className="p-8 flex items-center justify-between relative flex-shrink-0">
          <h2 className="text-xl font-bold text-center w-full">CHATS</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-8 sm:hidden text-indigo-900 text-2xl"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-4"></div>

        <div className="flex justify-center pt-8 pr-4 pb-4 pl-4 flex-shrink-0">
          <SignOut />
        </div>
      </aside>

      <section className="flex-1 p-4 sm:p-8 flex items-start sm:items-center justify-center relative">
        <div className="flex items-center max-w-md w-full relative">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-full bg-transparent border border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />

            {filteredUsers.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border text-indigo-900 overflow-hidden z-50 max-h-[200px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.uid}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                  >
                    <img
                      src={user.photoURL || "/default-avatar-icon.png"}
                      alt={user.nickname}
                      className="w-8 h-8 rounded-full bg"
                    />
                    <span className="font-medium">{user.nickname}</span>
                  </div>
                ))}
              </div>
            )}
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