"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faTrashCan,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export function UserExpandableCard({ tx }) {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  //functions
  const handleApproveWithdrawal = async (id) => {
    // alert("form submitted");
    // await console.log(`this is active : ${active}`);
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/requests/approve/withdraw", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          userId: active.userId._id,
          status: "approved",
          amount: active?.amount,
        }),
      });
      if (response.ok) {
        toast.success("Deposit approved", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to approve deposit", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  // useEffect(() => {
  //   if (isLoading) {
  //     toast.info(<FontAwesomeIcon icon={faCircleNotch} spin />, {
  //       position: "top-center",

  //       autoClose: 1000,
  //       // autoClose: !isLoading ? 1000 : false,
  //     });
  //   }
  // }, [isLoading]);
  useOutsideClick(ref, () => setActive(null));

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
              style={{
                marginTop: "50px",
              }}
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
                  src={"/assets/images/cashoutbtc.jpg"}
                  alt={active._id}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active._id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.transtype}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active._id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {`${active.transtype} `}for {`${active.amount} `} to{" "}
                      {`${active.addressUsed} `}
                      <br />
                      Transaction date :{" "}
                      {`${active.createdAt.replace("T", "--").split(".")[0]} `}
                      <br />
                      Status: {`this transaction is ${active.status} `}
                    </motion.p>
                  </div>
                  <div>
                    <button
                      layoutId={`button${1}}`}
                      target="_blank"
                      className="p-2 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => handleApproveWithdrawal(active._id)}
                    >
                      <span>Approve </span>
                      <FontAwesomeIcon icon={faCheck} />
                      {/* {active.ctaText} */}
                    </button>
                    <motion.a
                      layoutId={`button--${2}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="p-1 text-sm rounded-full font-bold justify-center mt-1  text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setActive(null)}
                      style={{
                        background: "#dc2626",
                      }}
                    >
                      <span>Reject </span>
                      <FontAwesomeIcon icon={faBan} />
                      {/* {active.ctaText} */}
                    </motion.a>
                    <motion.a
                      layoutId={`button-${3}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="justify-center text-sm rounded-full font-bold mt-1 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setActive(null)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#dc2626", fontSize: "30px" }}
                      />
                      {/* {active.ctaText} */}
                    </motion.a>
                  </div>
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
        {tx ? (
          tx.map((card, index) => (
            <motion.div
              layoutId={`card-${card._id}-${id}`}
              key={`card-${card._id}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row ">
                <motion.div layoutId={`image-${card._id}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={"/assets/images/cashoutbtc.jpg"}
                    alt={card._id}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="">
                  <motion.h3
                    layoutId={`title-${card._id}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-800 text-center md:text-left"
                  >
                    {card.transtype}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card._id}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                  >
                    {card.status}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card._id}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                {/* {card.ctaText} */}
                view
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="font-bold text-2 text-center">No transactions</p>
        )}
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
