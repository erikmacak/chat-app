"use client";

import React from "react";
import { auth } from "../../lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function SignIn() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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