"use client";
import React, { useState } from "react";
import TradingViewMiniChartWidget from "@component/tradingviewwidget/TradingViewMiniChartWidget";
import { useDataContext } from "@component/context/DataProvider";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Image from "next/image";

const Dashboard = () => {
  const {
    currentUser,
    btcRate,
    ethRate,
    ltcRate,
    xmrRate,
    xrpRate,
    zecRate,
    allTransactions,
  } = useDataContext();

  const tx = allTransactions.filter(
    (tx) => tx.userId?._id === currentUser?._id
  );

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/requests/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });
      toast.success("transaction deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete transaction");
    } finally {
      setIsLoading(false);
    }
  };
  const [cardInfo, setCardInfo] = useState(null);

  const totalCryptoBalance =
    currentUser?.balances?.bitcoin * btcRate +
    currentUser?.balances?.ethereum * ethRate +
    currentUser?.balances?.litecoin * ltcRate +
    currentUser?.balances?.monero * xmrRate +
    currentUser?.balances?.ripple * xrpRate +
    currentUser?.balances?.zcash * zecRate;

  return (
    <div className="min-h-screen bg-gray-900 p-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {/* Balance Overview Cards */}
        <div className="col-span-4 lg:col-span-1 bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Trading Profit</h3>
          <p className="text-3xl font-bold mt-4">
            ${currentUser && currentUser?.balances?.trading}
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1 bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Mining Profit</h3>
          <p className="text-3xl font-bold mt-4">
            ${totalCryptoBalance.toFixed(2)}
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1 bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Withdrawals</h3>
          <p className="text-3xl font-bold mt-4">$0.00</p>
        </div>
        <div className="col-span-4 lg:col-span-1 bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Deposit Balance</h3>
          <p className="text-3xl font-bold mt-4">
            ${currentUser && currentUser?.balances?.deposit}
          </p>
        </div>
      </div>

      {/* Trading Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-6">
        <div
          className="col-span-2 bg-gray-800 rounded-lg p-6"
          style={{
            gridColumn: "span 2",
            gridRow: "span 2",
            gap: "18px",
          }}
        >
          <h3 className="text-white text-xl font-semibold mb-4">
            Trading Overview
          </h3>
          {/* Embed a trading chart widget here */}
          <div
            className="bg-gray-700 rounded min-h-64 col-span-2"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              gap: "18px",
              minHeight: "399px",
            }}
          >
            <TradingViewMiniChartWidget />
          </div>
        </div>

        {/* Live Crypto Prices */}
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Live Crypto Prices</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <span>BTC</span>
              <span>${btcRate}</span>
            </li>
            <li className="flex justify-between">
              <span>ETH</span>
              <span>${ethRate}</span>
            </li>
            <li className="flex justify-between">
              <span>LTC</span>
              <span>${ltcRate}</span>
            </li>
            <li className="flex justify-between">
              <span>XMR</span>
              <span>${xmrRate}</span>
            </li>
            <li className="flex justify-between">
              <span>XRP</span>
              <span>${xrpRate}</span>
            </li>
            <li className="flex justify-between">
              <span>zec</span>
              <span>${zecRate}</span>
            </li>
            {/* Add more crypto as needed */}
          </ul>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold">Withdraw and Earnings</h3>
          <div className="mt-4">
            <Link
              href={"/user/profile/withdrawal"}
              className="w-full bg-blue-600 p-2 rounded-lg"
            >
              Withdraw Now
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800 rounded-lg p-2 mt-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div
          className="bg-gray-700  rounded-lg h-32"
          style={{
            minHeight: "500px",
            overflowY: "auto",
          }}
        >
          {!cardInfo && (
            <div className="">
              {tx.map((item, i) => (
                <>
                  <div
                    className="flex items-center  p-2 md:p-0 rounded justify-between"
                    onClick={() => setCardInfo(item)}
                  >
                    <div className="flex items-center ">
                      <Image
                        width={100}
                        height={100}
                        src={`/assets/images/${
                          item.transtype.includes("deposit")
                            ? "deposit.jpg"
                            : "withdrawal.jpeg"
                        }`}
                        alt={"test div"}
                        className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                      />
                      <div className="flex flex-col p-2">
                        <p> {item.transtype}</p>
                        <span>{item.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCardInfo(item)}
                      className="p-2 bg-black text-white rounded hidden md:block"
                      style={{ padding: "5px 20px" }}
                    >
                      {" "}
                      view{" "}
                    </button>
                  </div>
                </>
              ))}
            </div>
          )}
          {cardInfo && (
            <div
              className="w-full rounded"
              style={{ minHeight: "200px", padding: "12px 10px" }}
            >
              <div>
                <Image
                  priority
                  width={1000}
                  height={1000}
                  src={`/assets/images/${
                    cardInfo.transtype.includes("deposit")
                      ? "deposit.jpg"
                      : "withdrawal.jpeg"
                  }`}
                  alt={cardInfo._id}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </div>

              <div>
                <div className="flex flex-col md:flex-row justify-between items-start p-4">
                  <div className="">
                    <h3 className="font-bold text-neutral-700">
                      {cardInfo.transtype}
                    </h3>
                    <p
                      className="text-neutral-600 dark:text-neutral-400 text-sm "
                      style={{
                        maxWidth: "300px",
                      }}
                    >
                      {`${cardInfo.transtype} `}for {`${cardInfo.amount} `} to{" "}
                      <span
                        style={{
                          maxWidth: "290px",
                          overflow: "scroll",
                          display: "inline-block",
                        }}
                      >
                        {`${cardInfo.addressUsed} `}
                      </span>
                      <br />
                      Transaction date :{" "}
                      {`${
                        cardInfo.createdAt.replace("T", "--").split(".")[0]
                      } `}
                      <br />
                      Status: {`this transaction is ${cardInfo.status} `}
                      <br />
                      <span
                        onClick={() => {
                          window.navigator.clipboard.write(cardInfo.txhash);
                          toast("transaction hash copied");
                        }}
                        className="inline-flex mt-1 bg-black p-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        transaction hash: {cardInfo.txhash}
                        <br />
                        click to copy
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col">
                    <span
                      className="p-1 text-sm rounded-full font-bold justify-center mt-1 bg-black  text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setCardInfo(null)}
                    >
                      <span className="p-2">Close </span>

                      {/* {active.ctaText} */}
                    </span>
                    <span
                      className="justify-center text-sm rounded-full font-bold mt-1 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => handleDelete(cardInfo._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#dc2626", fontSize: "30px" }}
                      />
                      {/* {active.ctaText} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
