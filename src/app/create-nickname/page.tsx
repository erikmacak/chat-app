"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { setUserNickname, hasUserNickname } from "../../../services/user/userService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nicknameSchema, NicknameFormData } from "../../../schemas/user/nicknameSchema";

export default function CreateNicknamePage() {
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter();
  const [checkingNickname, setCheckingNickname] = useState(true);

  useEffect(() => {
    const checkNicknameStatus = async () => {
      if (!authLoading && user) {
        const hasNickname = await hasUserNickname(user.uid);
        if (hasNickname) {
          router.push("/home-page");
        } else {
          setCheckingNickname(false);
        }
      } else if (!authLoading && !user) {
        router.push("/");
      }
    };

    checkNicknameStatus();
  }, [authLoading, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
  });

  const onSubmit = async (data: NicknameFormData) => {
    if (!user) return;

    try {
      await setUserNickname(user.uid, data.nickname.trim());
      router.push("/home-page");
    } catch (error) {
      console.error("Failed to set nickname:", error);
      alert("Failed to save nickname, try again.");
    }
  };

  if (authLoading || checkingNickname) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white">
      <section className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg p-6 text-indigo-900 shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Create Your Nickname
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="nickname" className="block mb-1 font-medium">
                Nickname
              </label>
              <input
                id="nickname"
                {...register("nickname")}
                className={`w-full px-4 py-2 rounded border ${
                  errors.nickname ? "border-red-600" : "border-indigo-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                disabled={isSubmitting}
                autoFocus
              />
              {errors.nickname && (
                <p className="text-red-600 text-sm mt-1">{errors.nickname.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Nickname"}
            </button>
          </form>
        </div>
      </section>
      <footer className="text-sm opacity-80 mt-8 text-center">
        © {new Date().getFullYear()} Best Chat App
      </footer>
    </main>
  );
}