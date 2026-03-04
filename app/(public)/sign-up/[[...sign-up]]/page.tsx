"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    if (!isLoaded) return;

    await signUp.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_40%)] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-semibold tracking-tight leading-tight">
              StackLens<span className="text-purple-500">.</span>
            </h1>

            <p className="mt-6 text-lg text-neutral-400 max-w-md leading-relaxed">
              Start analyzing codebases smarter.
              AI-generated architecture insights built for developers.
            </p>

            <div className="mt-10 text-sm text-neutral-500">
              Built for engineers who value clarity.
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl p-10 rounded-3xl shadow-[0_0_40px_rgba(120,119,198,0.15)]"
          >
            <h2 className="text-2xl font-medium mb-8 tracking-tight">
              Create Account
            </h2>

            <div className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#111113] border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#111113] border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleSignUp}
                className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
              >
                Create Account
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800" />
                </div>
                <div className="relative text-center text-xs text-neutral-500 bg-[#0a0a0c] px-2 w-fit mx-auto">
                  OR CONTINUE WITH
                </div>
              </div>

              {/* Google */}
              <button
                onClick={() => handleOAuth("google")}
                className="w-full py-3 rounded-xl bg-[#111113] border border-neutral-700 hover:bg-neutral-800 transition-all duration-200"
              >
                Continue with Google
              </button>

              {/* GitHub */}
              <button
                onClick={() => handleOAuth("github")}
                className="w-full py-3 rounded-xl bg-[#111113] border border-neutral-700 hover:bg-neutral-800 transition-all duration-200"
              >
                Continue with GitHub
              </button>
            </div>

            <p className="text-sm text-neutral-500 mt-6">
              Already have an account?{" "}
              <a href="/sign-in" className="text-purple-400 hover:underline">
                Login
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}