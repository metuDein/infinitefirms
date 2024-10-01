"use client";
import Image from "next/image";
import Link from "next/link";

const DummyContent = ({ description, src, link }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 ">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {description}
      </p>

      <Image
        src={src || "https://assets.aceternity.com/macbook.png"}
        alt="Macbook mockup from Aceternity UI"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
      <Link
        href={`/user/profile/${link}`}
        className="p-2 sm:w-[full] w-[40%] bg-black text-white rounded block mx-auto my-4 text-center"
      >
        Start {link === "trading" ? "Trading" : "Mining"}
      </Link>
    </div>
  );
};

export default DummyContent;
