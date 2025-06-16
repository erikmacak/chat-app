//Modified LandingPage component to check user existence and nickname, redirecting accordingly

"use client";

import SignIn from "../../components/auth/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserIfNotExists, hasUserNickname } from "../../services/user/userService";

export default function LandingPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (user) {
        await createUserIfNotExists({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL
        });

        const nicknameExists = await hasUserNickname(user.uid);

        if (!nicknameExists) {
          router.push("/create-nickname");
          return;
        }

        router.push("/home-page");
      }
    }

    if (!loading) {
      checkUserAndRedirect();
    }
  },[user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white">
      <section className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl text-center space-y-6">
          <h1 className="text-4xl font-extrabold">Simple Chat Application</h1>

          <p className="text-lg sm:text-xl max-w-xl mx-auto">
            Chat quickly and easily with other users.
          </p>

          <div className="bg-white bg-opacity-80 rounded-lg p-6 max-w-2xl mx-auto text-left text-indigo-900">
            <h2 className="text-xl font-semibold mb-2">How to get started?</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
              <li>Sign in using your Google account.</li>
              <li>Search for users by their nickname.</li>
              <li>Send them a message and enjoy chatting!</li>
            </ol>
          </div>

          <div className="mt-4">
            <SignIn />
          </div>
        </div>
      </section>

      <footer className="text-sm opacity-80 mt-8 text-center">
        © {new Date().getFullYear()} Best Chat App
      </footer>
    </main>
  );
}