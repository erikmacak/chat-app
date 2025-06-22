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
      <button onClick={handleSignOut} className="px-4 py-2 cursor-pointer">
        <img 
          src="/signout-icon.png"
          alt="Sign Out"
          className="w-16" 
        />
      </button>
  );
}