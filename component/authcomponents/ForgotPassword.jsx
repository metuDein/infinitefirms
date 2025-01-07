"use client";
import React from "react";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { cn } from "@/lib/utils";
import { useDataContext } from "@component/context/DataProvider";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { useSession } from "next-auth/react";

export function ForgotPassword() {
  const router = useRouter();
  // const session = await getServerSession();
  const { getUser } = useDataContext();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = JSON.parse(response.error); // Parse the JSON error message
        if (errorData.code === 404) {
          setErrorMsg(errorData.message);
        } else if (errorData.code === 401) {
          setErrorMsg("Incorrect password.");
        } else if (errorData.code === 400) {
          setErrorMsg("Username and password are required.");
        } else {
          setErrorMsg("An unknown error occurred.");
        }
        setTimeout(() => setErrorMsg(null), 3000);
        return;
      }

      if (response.ok) {
        const res = await fetch("/api/mails/resetpassword", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            url: data.resetUrl,
          }),
        });

        if (res.ok) {
          toast.success("reset link sent.");
          return;
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Reset password
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your email to receive a reset link
        </p>
        <form className="my-8" onSubmit={handleSubmit} autoComplete="false">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              id="email"
              placeholder="example@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>

          {!loading && (
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Continue &rarr;
              <BottomGradient />
            </button>
          )}
          {loading && (
            <article
              className=" text-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="mx-auto text-center"
              />
              <BottomGradient />
            </article>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ForgotPassword;
