"use client";

import React from "react";
import { auth } from "../../lib/firebase";

export default function SignOut() {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };  

  return (
    <button
      onClick={() => auth.signOut()}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  );
}