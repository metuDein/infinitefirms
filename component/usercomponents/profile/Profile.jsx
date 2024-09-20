"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import BalanceComponent from "./components/BalanceComponent";
import { ExpandableCardDemo } from "./components/TransactionTab";
import { getServerSession } from "next-auth";
import { useDataContext } from "@component/context/DataProvider";
import Dashboard from "./components/Dashboard";
import Loader from "@component/loader/Loader";

const Profile = () => {
  const { currentUser, currentUserTransactions, allTransactions, appLoading } =
    useDataContext();
  const tx = allTransactions.filter(
    (tx) => tx.userId?._id === currentUser?._id
  );

  if (appLoading) return <Loader />;

  return (
    <main className="w-full min-h-screen">
      <section
        className="max-w-5xl sm:max-w-xl mx-auto p-3 rounded-md flex flex-wrap "
        style={{
          paddingTop: "130px",
        }}
      >
        {/* <h2
          className="text-3xl font-mono max-w-5xl text-center"
          style={{
            color: "#5F5DB1",
          }}
        >
          Dashboard
        </h2> */}
        <Dashboard />
      </section>
    </main>
  );
};
export default Profile;
