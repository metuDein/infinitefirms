"use client";
import { useDataContext } from "@component/context/DataProvider";
import { ExpandableCardDemo } from "./components/TradersCard";
import { ExpandableCard } from "./components/MyTradersCard";
import { useState } from "react";
import Image from "next/image";
import { IconArrowBigUpLines, IconArrowBigUp } from "@tabler/icons-react";
import StarRating from "@component/usercomponents/profile/components/StarRating";
import CountryFlag from "@component/admincomponents/components/CountryFlag";
import { toast } from "react-toastify";

const TradersDash = () => {
  const { currentUser, allTraders, allCopiers, getCopiers } = useDataContext();
  const [cardInfo, setCardInfo] = useState(null);

  const myTraders = allCopiers.filter(
    (item) => item.userId === currentUser?._id
  );
  function hasMatchingValue(obj1, obj2) {
    for (const key in obj1) {
      if (obj1[key] === obj2[key]) {
        return true;
      }
    }
    return false;
  }

  const handleCopyTrader = async (traderId) => {
    if (
      allCopiers.find(
        (item) =>
          item.userId === currentUser?._id &&
          item.traderId?._id === cardInfo._id
      )
    ) {
      toast.error("You're already copying this trader");
      return;
    }
    if (!hasMatchingValue(currentUser.accountType, cardInfo.traderType)) {
      return toast.error("this trader is not available to you");
    }
    if (currentUser?.balances?.deposit < 500) {
      toast.error("Make sure you have a deposit of at least $500");
      return;
    }
    try {
      const response = await fetch("/api/deposits", {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser._id,
          txType: "copy trading deposit",
          amount: 10000,
          address: cardInfo?.traderName,
          txhash: cardInfo?.traderEmail,
          image: currentUser?.image || {},
        }),
      });

      const data = await response.json();
      console.log(data);

      const { newTx } = data;
      if (response.ok) {
        const response = await fetch("/api/copytrader", {
          method: "POST",
          body: JSON.stringify({
            userId: currentUser._id,
            traderId: traderId,
            transId: newTx?._id,
          }),
        });
        if (response.ok) {
          await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser?._id,
              instruments: `copy Trading`,
              price: currentUser?.balances?.deposit,
              transId: newTx?._id,
              earning: 50,
              status: "active",
            }),
          });
          await getCopiers();
          toast.success("Trader copied successfully");
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const handleStopTrader = async (id, transId) => {
    try {
      const response = await fetch("/api/copytrader", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      if (response.ok) {
        await fetch("/api/subscribe", {
          method: "PATCH",
          body: JSON.stringify({
            id: transId,
            status: "inactive",
          }),
        });
        await getCopiers();
        toast.success("you have stopped copying this trader");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto justify-center flex flex-col md:flex-row gap-10 pt-10">
      <div
        className="w-full"
        style={{
          flexBasis: "48%",
          flexGrow: "1",
        }}
      >
        <h2 className="font-bold text-xl ">My Traders</h2>
        <div className="mt-3 p-2 border rounded border-solid border-black">
          <div className="">
            {myTraders.map((item, i) => (
              <>
                <div className="flex items-center  p-2 rounded justify-between">
                  <div className="flex items-center ">
                    <Image
                      width={100}
                      height={100}
                      src={item?.traderId?.image?.secure_url}
                      alt={item?._id}
                      className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                    />
                    <div className="flex flex-col p-2">
                      <p> {item.traderId.traderName}</p>
                      <span>{item.traderId.traderEmail}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStopTrader(item?._id, item?.transId)}
                    className="p-2 bg-black text-white rounded hidden md:block"
                    style={{ padding: "5px 20px", background: "#dc2626" }}
                  >
                    {" "}
                    Stop{" "}
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div
        className="w-full"
        style={{
          flexBasis: "48%",
          flexGrow: "1",
        }}
      >
        <h2 className="font-bold text-xl">Available Traders</h2>
        <div className="mt-3 p-2 border rounded border-solid border-black">
          {!cardInfo && (
            <div className="">
              {allTraders.map((item, i) => (
                <>
                  <div
                    className="flex items-center  p-2 rounded justify-between"
                    onClick={() => setCardInfo(item)}
                  >
                    <div className="flex items-center ">
                      <Image
                        width={100}
                        height={100}
                        src={item?.image?.secure_url}
                        alt={"test div"}
                        className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                      />
                      <div className="flex flex-col p-2">
                        <p> {item.traderName}</p>
                        <span>{item.traderEmail}</span>
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
                  src={cardInfo?.image?.secure_url}
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
                      <span className="font-semibold text-2xl">
                        {" "}
                        {cardInfo.traderName}{" "}
                      </span>
                      <br />
                      <span className="font-normal">
                        {" "}
                        {cardInfo.traderEmail}{" "}
                      </span>
                      <br />
                      <span className="flex flex-col-reverse">
                        {/* {`${cardInfo.traderLocation} `}{" "} */}
                        <CountryFlag countryName={"us"} />{" "}
                      </span>
                      <br />
                      <span className="font-semibold">
                        <StarRating rating={4} />
                      </span>
                      <span
                        className="font-semibold"
                        style={{
                          color: "#75b775",
                        }}
                      >
                        {`${cardInfo.traderCopier}`} Copiers ( 30%
                        <IconArrowBigUp className="inline" /> )
                      </span>
                      <br />{" "}
                      <span
                        className="font-semibold"
                        style={{
                          color: "#75b775",
                        }}
                      >
                        {` ${cardInfo.traderRoi?.thirtydays}% returns 30 days`}
                        <IconArrowBigUpLines className="inline" />{" "}
                      </span>
                      <br />
                      <button
                        className="px-4 md:px-2 my-1 py-2 text-sm rounded font-bold  text-white cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(cardInfo.traderEmail);
                          alert("Email copied successfully!");
                        }}
                        style={{
                          backgroundColor: "#00C2ff",
                        }}
                      >
                        Accessible to:{" "}
                        {cardInfo.traderType.gold && "Gold Plan Users"}
                        {cardInfo.traderType.silver && "Silver Plan Users"}
                        {cardInfo.traderType.bronze && "Bronze Plan Users"}
                      </button>
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col">
                    <button
                      className="p-2 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => handleCopyTrader(cardInfo?._id)}
                    >
                      <span> Copy </span>

                      {/* {active.ctaText} */}
                    </button>

                    <span
                      className="p-1 text-sm rounded-full font-bold justify-center mt-1 bg-black  text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setCardInfo(null)}
                    >
                      <span className="p-2">Close </span>

                      {/* {active.ctaText} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default TradersDash;
