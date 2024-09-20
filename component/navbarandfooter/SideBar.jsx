"use client";
import { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
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
import { signOut } from "next-auth/react";
import { useDataContext } from "@component/context/DataProvider";

const SideBar = () => {
  const { currentUser } = useDataContext();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("user logged out");
    } catch (error) {
      console.error(error.message);
    }
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile",
    },
    {
      title: "Mining",
      icon: (
        <IconChartAreaLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/mining",
    },

    {
      title: "Traders",
      icon: (
        <IconUserHexagon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/traders",
    },
    {
      title: "Transactions",
      icon: (
        <IconHistoryToggle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/history",
    },

    {
      title: "Deposit",
      icon: (
        <IconPackageImport className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/deposit",
    },
    {
      title: "Withdrawal",
      icon: (
        <IconCashBanknote className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/withdrawal",
    },
    {
      title: "Upgrade",
      icon: (
        <IconGauge className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/upgrade",
    },
    {
      title: "settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/settings",
    },

    {
      title: "Logout",
      icon: (
        <IconLogout
          onClick={() => handleLogout()}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: "",
    },
  ];
  const links2 = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile",
    },
    {
      title: "Mining",
      icon: (
        <IconChartAreaLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/mining",
    },

    {
      title: "Traders",
      icon: (
        <IconUserHexagon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/traders",
    },
    {
      title: "Transactions",
      icon: (
        <IconHistoryToggle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/history",
    },

    {
      title: "Deposit",
      icon: (
        <IconPackageImport className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/deposit",
    },
    {
      title: "Withdrawal",
      icon: (
        <IconCashBanknote className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/withdrawal",
    },
    {
      title: "Upgrade",
      icon: (
        <IconGauge className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/upgrade",
    },
    {
      title: "settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/profile/settings",
    },
    {
      title: "Admin  panel",
      icon: (
        <IconAdjustmentsCog className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/admin/panel",
    },
    {
      title: "Logout",
      icon: (
        <IconLogout
          onClick={() => handleLogout()}
          className="h-full w-full text-neutral-500 dark:text-neutral-300"
        />
      ),
      href: "",
    },
  ];

  return (
    <div className="items-start md:h-screen absolute mt-7 overflow-scroll">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={
          currentUser && currentUser?.roles?.Admin === 5150 ? links2 : links
        }
      />
    </div>
  );
};
export default SideBar;
