"use client";
import React from "react";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSearchParams } from "@node_modules/next/navigation";

export function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPass !== password) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/userrequests/resetpassword", {
        method: "PATCH",
        body: JSON.stringify({ password, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "An unknown error occurred.");
        return;
      }

      toast.success("Password reset successfully. Redirecting...");
      // router.push("/login");
    } catch (error) {
      console.error(error.response);
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black "
      style={{}}
    >
      <div
        className="mx-auto w-full"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          src={"/assets/logo/logo.png"}
          alt="logo"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      <p className="text-neutral-600 text-center font-semibold max-w-sm mt-2 dark:text-neutral-300">
        Reset password
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            id="confirmpasspassword"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            required
          />
        </LabelInputContainer>

        {!loading && (
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Reset &rarr;
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

export default page;
