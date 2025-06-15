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
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => signInWithGoogle()}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}