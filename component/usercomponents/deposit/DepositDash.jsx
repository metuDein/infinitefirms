"use client";
import {
  IconDeviceAnalytics,
  IconChartAreaLine,
  IconMoneybag,
} from "@tabler/icons-react";
import Link from "next/link";

import { useDataContext } from "@component/context/DataProvider";
import { ExpandableCardDemo } from "../profile/components/TransactionTab";

const DepositDash = () => {
  const { currentUser, allTransactions } = useDataContext();
  const tx = allTransactions.filter(
    (tx) => tx.userId?._id === currentUser?._id
  );

  const depositTx = tx.filter((item) => item.transtype.includes("deposit"));

  return (
    <section className="max-w-5xl mx-auto min-h-screen pt-20 sm:pt-4">
      <h2 className="text-center text-black text-4xl font-sans font-bold">
        Select Deposit type
      </h2>
      <div
        className="mx-auto  md:max-w-3xl flex  flex-col md:flex-row items-center gap-2 justify-center mt-10"
        style={{
          maxWidth: "300px",
        }}
      >
        <Link
          href={"/user/profile/deposit/trading"}
          className="p-2 border rounded border-gray-200 bg-black w-[150px] min-h-[400px] pt-10 pb-10"
        >
          <IconDeviceAnalytics className="text-xl text-white mx-auto w-[200px] " />
          <p className="text-xl font-semibold text-center text-white">
            Trading Deposit
          </p>
        </Link>
        <Link
          href={"/user/profile/deposit/mining"}
          className="p-2 border rounded border-gray-200 bg-black w-[150px] min-h-[400px] pt-10 pb-10"
        >
          <IconChartAreaLine className="text-xl text-white mx-auto w-[200px] " />
          <p className="text-xl font-semibold text-center text-white">
            Mining Deposit
          </p>
        </Link>
        <Link
          href={"/user/profile/deposit/balancedeposit"}
          className="p-2 border rounded border-gray-200 bg-black w-[150px] min-h-[400px] pt-10 pb-10"
        >
          <IconMoneybag className="text-xl text-white mx-auto w-[200px] " />
          <p className="text-xl font-semibold text-center text-white">
            Balance Deposit
          </p>
        </Link>
      </div>
      <div className="mt-10 pt-5">
        <h2 className="text-2xl font-bold text-center mt-10">
          {" "}
          Recent deposits
        </h2>
        <ExpandableCardDemo tx={depositTx} />
      </div>
    </section>
  );
};
export default DepositDash;
