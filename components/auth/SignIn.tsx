"use client";

import React, { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function SignIn() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      console.log("User signed in:", user);
    }
    if (error) {
      console.error("Sign in error:", error);
    }
  }, [user, error]);

  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
        className="px-6 py-2 bg-white text-indigo-700 rounded hover:bg-indigo-100 transition cursor-pointer"
        disabled={loading}
      >
        Sign in with Google
      </button>
    </div>
  );
}