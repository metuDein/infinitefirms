"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useDataContext } from "@component/context/DataProvider";
import { IconArrowBigUpLines, IconArrowBigUp } from "@tabler/icons-react";
import CountryFlag from "../CountryFlag";
import StarRating from "@component/usercomponents/profile/components/StarRating";
// import CountryFlag from "@component/admincomponents/components/CountryFlag";

export function ExpandableCardDemo({ tx }) {
  const [active, setActive] = useState(tx);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  function capitalizeFirstLetters(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active._id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active._id}-${id}`}>
                <Image
                  priority
                  width={1000}
                  height={1000}
                  src={active?.image?.secure_url}
                  alt={active._id}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active._id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-xl"
                    >
                      {active.transtype}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active._id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      <span className="font-semibold text-2xl">
                        {" "}
                        {active.traderName}{" "}
                      </span>
                      <br />
                      <span className="font-normal">
                        {" "}
                        {active.traderEmail}{" "}
                      </span>
                      <br />
                      <span className="float-left">
                        <CountryFlag countryName={active.traderLocation} />
                      </span>
                      <br />
                      <StarRating rating={active.traderRating} />
                      {/* country:  {`${active.traderLocation} `} */}
                      <br />
                      <span
                        className="font-semibold"
                        style={{
                          color: "#75b775",
                        }}
                      >
                        {`${active.traderCopier}`} Copiers ( 30%
                        <IconArrowBigUp className="inline" /> )
                      </span>
                      <br />{" "}
                      <span
                        className="font-semibold"
                        style={{
                          color: "#75b775",
                        }}
                      >
                        {` ${active.traderRoi?.thirtydays}% returns 30 days`}
                        <IconArrowBigUpLines className="inline" />{" "}
                      </span>
                      <br />
                      <button
                        className="px-4 my-1 py-2 text-sm rounded font-bold  text-white cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(active.traderEmail);
                          alert("Email copied successfully!");
                        }}
                        style={{
                          backgroundColor: "#00C2ff",
                        }}
                      >
                        Accessible to:{" "}
                        {active.traderType.gold && "Gold Plan Users"}
                        {active.traderType.silver && "Silver Plan Users"}
                        {active.traderType.bronze && "Bronze Plan Users"}
                      </button>
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active?.title}-${id}`}
                    href={active?.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer"
                    onClick={() => setActive(null)}
                  >
                    close
                    {/* {active.ctaText} */}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        <motion.div
          layoutId={`card-${tx?._id}-${id}`}
          key={`card-${tx?._id}-${id}`}
          onClick={() => setActive(tx)}
          className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
        >
          <div className="flex gap-4 flex-col md:flex-row ">
            <motion.div layoutId={`image-${tx?._id}-${id}`}>
              <Image
                width={100}
                height={100}
                src={tx?.image?.secure_url}
                alt={tx?._id}
                className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
              />
            </motion.div>
            <div className="">
              <motion.h3
                layoutId={`title-${tx?._id}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-800 text-center md:text-left text-2xl"
              >
                {tx?.traderName}
              </motion.h3>
              <motion.p
                layoutId={`description-${tx?._id}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-sm"
              >
                {tx?.traderEmail}
              </motion.p>
            </div>
          </div>
          <motion.button
            layoutId={`button-${tx?._id}-${tx?._id}`}
            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
          >
            {/* {card.ctaText} */}
            view
          </motion.button>
        </motion.div>
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
