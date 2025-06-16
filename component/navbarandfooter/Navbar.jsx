"use client";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MultiStepLoader as Loader } from "@components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useState } from "react";
// import LanguageSelector from "./LanguageSelector";
import {
  IconPackageImport,
  IconSettings,
  IconHistoryToggle,
  IconHome,
  IconUserHexagon,
  IconChartAreaLine,
  IconCashBanknote,
  IconGauge,
  IconLogout,
  IconAdjustmentsCog,
} from "@tabler/icons-react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import TradingViewWidget from "@component/tradingviewwidget/TradingViewWidget";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useDataContext } from "@component/context/DataProvider";

const Navbar = () => {
  const { data: session } = useSession();
  const { currentUser } = useDataContext();

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const loadingStates = [
    {
      text: "Buying a condo",
    },
    {
      text: "Travelling in a flight",
    },
    {
      text: "Meeting Tyler Durden",
    },
    {
      text: "He makes soap",
    },
    {
      text: "We goto a bar",
    },
    {
      text: "Start a fight",
    },
    {
      text: "We like it",
    },
    {
      text: "Welcome to F**** C***",
    },
  ];
  // Add your navigation bar here

  const MultiStepLoaderDemo = () => {
    return (
      <div className="flex items-center justify-center">
        {/* Core Loader Modal */}
        <Loader
          loadingStates={loadingStates}
          loading={loading}
          duration={2000}
        />

        {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
        <button
          onClick={() => setLoading(true)}
          className=""
          style={{
            boxShadow:
              "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
          }}
        >
          Help
        </button>

        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsOpen(false);
      console.log("user logged out");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className=" bg-black w-full fixed  z-[1000]">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={"/"} className="flex items-center">
                <Image
                  className="w-[4rem]"
                  src="/assets/logo/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />

                <span
                  className="ml-1 text-xl font-bold md:block hidden"
                  style={{
                    color: "#497fc5",
                  }}
                >
                  Infinitefirms
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            {!session && (
              <div className="hidden md:flex space-x-4">
                <Link href="/">Home</Link>
                <Link href="/faq/aboutus">About</Link>
                <Link href="/faq/services">Services</Link>
                <Link href="/faq/contactus">Contact</Link>
                <Link href="/user-register">Register</Link>
                <Link href="/user-login">Login</Link>
                {/* <LanguageSelector /> */}
              </div>
            )}
            {session && (
              <div className="hidden md:flex space-x-4">
                <button className="flex items-center justify-center gap-1">
                  <Link href={"/user/profile"}>{currentUser?.firstname}</Link>
                  {/* //user image */}
                  <div>
                    <Image
                      src={currentUser?.image?.secure_url || ""}
                      width={60}
                      height={60}
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        border: "2px solid #fff",
                      }}
                    />
                  </div>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-center items-center gap-2">
              {!!session && (
                <button onClick={toggleMenu}>
                  <div>
                    <Image
                      src={currentUser?.image?.secure_url || ""}
                      alt="user icon"
                      width={60}
                      height={60}
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        border: "2px solid #fff",
                      }}
                    />
                  </div>
                </button>
              )}

              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && !session && (
          <div className="md:hidden">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center mt-2 rounded h-screen">
              <Link
                href="/"
                className="rounded font-semibold text-right flex items-center justify-center gap-1 "
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconHome className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Home
              </Link>
              <Link
                href="/faq/aboutus"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/faq/services"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/faq/contactus"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/user-register"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/user-login"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
        {isOpen && !!session && (
          <div className="md:hidden">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center mt-2 rounded h-screen">
              <Link
                href="/user/profile"
                className="rounded font-semibold text-right flex items-center justify-center gap-1 "
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconHome className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Dashboard
              </Link>
              <Link
                href="/user/profile/mining"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconChartAreaLine className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Mining
              </Link>
              <Link
                href="/user/profile/traders"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconUserHexagon className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Traders
              </Link>
              <Link
                href="/user/profile/history"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconHistoryToggle className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                History
              </Link>
              <Link
                href="/user/profile/deposit"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconPackageImport className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Deposit
              </Link>
              <Link
                href="/user/profile/withdrawal"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconCashBanknote className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Withdrawal
              </Link>
              <Link
                href="/user/profile/upgrade"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconGauge className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Upgrade
              </Link>
              <Link
                href="/user/profile/settings"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={() => setIsOpen(false)}
              >
                <IconSettings className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Settings
              </Link>
              {currentUser && currentUser?.roles?.Admin === 5150 && (
                <Link
                  href="/admin/panel"
                  className="rounded font-semibold text-right flex items-center justify-center gap-1"
                  style={{
                    padding: "10px 0",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <IconAdjustmentsCog className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                  Admin Panel
                </Link>
              )}
              <button
                href="/admin/panel"
                className="rounded font-semibold text-right flex items-center justify-center gap-1"
                style={{
                  padding: "10px 0",
                }}
                onClick={handleLogout}
              >
                <IconLogout className="h-[10] w-[10] text-neutral-500 dark:text-neutral-300" />{" "}
                Log out
              </button>
            </div>
          </div>
        )}
      </nav>
      <TradingViewWidget />
    </header>
  );
};

export default Navbar;
