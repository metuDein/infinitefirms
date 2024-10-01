"use client";
import React from "react";
import { FlipWords } from "@components/ui/flip-words";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JoinNow = () => {
  const router = useRouter();
  const words = ["secure", "profitable", "smart", "innovative"];

  return (
    <div className="h-[30rem] max-w-4xl flex flex-col mx-auto justify-center items-center px-4">
      <h2 className="text-center text-black text-4xl font-bold pb-4">
        {" "}
        Begin your Journey Today
      </h2>
      <div className="text-xl mx-auto text-center font-normal text-slate-800">
        Achieve your financial goals with our expert investment strategies,
        designed to build
        <FlipWords words={words} />
        pathways to freedom.
        <div className="mt-8">
          <button
            onClick={() => router.push("/user-register")}
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-6 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-800 transition duration-200 text-center"
          >
            Join now
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinNow;
