"use client";

import React from "react";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };  

  return (
    <button onClick={handleSignOut} className="px-4 py-2 cursor-pointer">
      <img 
        src="/signout-icon.png"
        alt="Sign Out"
        className="w-16" 
      />
    </button>
  );
}