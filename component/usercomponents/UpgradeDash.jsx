"use client";
import { useDataContext } from "@component/context/DataProvider";
import { useState, useEffect } from "react";
import { IconBrandTether, IconCurrencyBitcoin } from "@tabler/icons-react";
import CountdownTimer from "./deposit/mining/component/Counter";
import Image from "next/image";
import { toast } from "react-toastify";

const UpgradeDash = () => {
  const { currentUser } = useDataContext();

  const [confirm, setConfirm] = useState("selectPlan");
  const [plan, setPlan] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [btcRate, setBtcRate] = useState(null);
  const [txAmount, setTxAmount] = useState(0);
  const [txHash, setTxHash] = useState("");

  const paymentRequest = (amount) => {
    setConfirm("payment method");
    setTxAmount(amount);
  };

  const btcPayment = () => {
    setConfirm("btc payment");
    setSelectedAddress(wallets.bitcoin.address);
  };
  const usdtPayment = () => {
    setConfirm("usdt payment");
    setSelectedAddress(wallets.usdt.address);
  };
  const handleCalculate = (amount) => {
    if (btcRate && amount) {
      return (amount / btcRate).toFixed(7);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAddress);
    toast.success("Address copied successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/deposits", {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser._id,
          txType: `upgrade to ${plan} deposit`,
          amount: txAmount,
          address: selectedAddress,
          txhash: txHash,
        }),
      });

      console.log(response);
      const data = await response.json();

      if (response.ok) {
        toast.success("Upgrade request successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setConfirm(null);
        // setTxAmount(0);
        // setSelectedAddress("");
      } else {
        toast.error("Failed to deposit", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process payment", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const wallets = {
    bitcoin: {
      address: "bc1qxu90tfsvsl5q767eyszmnm4wkajcq9nfywd96y",
      src: "/assets/wallets/btcwallet.jpg",
    },
    usdt: {
      address: "0xce3332C5E4B32d02E382F6d76FeCa5D9AB87b6F0",
      src: "/assets/wallets/ethwallet.jpg",
    },
  };

  const purchase = () => {
    switch (confirm) {
      case "selectPlan":
        return (
          <div className="flex flex-wrap justify-center gap-2 items-center h-full mt-10">
            <UpgradeTabDetails usdPrice={1500} planName={"Bronze"} />
            <UpgradeTabDetails usdPrice={4500} planName={"Sliver"} />
            <UpgradeTabDetails usdPrice={10000} planName={"Gold"} />
          </div>
        );
      case "payment method":
        return (
          <>
            <h2 className="text-black pt-10 text-center font-bold text-2xl">
              Select a deposit method
            </h2>
            <div
              className="flex flex-wrap items-center justify-center h-full mt-10 gap-2 mx-auto"
              style={{}}
            >
              <div
                onClick={() => btcPayment()}
                className="p-2 border rounded border-gray-200 bg-black w-[150px] min-h-[400px] pt-10 pb-10  cursor-pointer"
              >
                <IconCurrencyBitcoin className="text-xl text-white mx-auto w-[200px] " />
                <p className="text-xl font-semibold text-center text-white">
                  Bitcoin
                </p>
              </div>
              <div
                onClick={() => usdtPayment()}
                className="p-2 border rounded border-gray-200 bg-black w-[150px] min-h-[400px] pt-10 pb-10 cursor-pointer"
              >
                <IconBrandTether className="text-xl text-white mx-auto w-[200px] " />
                <p className="text-xl font-semibold text-center text-white">
                  USDT
                </p>
              </div>
            </div>
          </>
        );

      case "btc payment":
        return (
          <div className="pt-10">
            <PaymentTab
              src={wallets.bitcoin.src}
              amount={handleCalculate(txAmount)}
              coinName={"BTC"}
            />
          </div>
        );
      case "usdt payment":
        return (
          <div className="pt-10">
            <PaymentTab
              src={wallets.usdt.src}
              amount={txAmount}
              coinName={"USDT"}
            />
          </div>
        );
      case "confirm payment":
        return (
          <div
            className="max-w-[400px] bg-neutral-900 pt-10 mt-2 rounded"
            style={
              {
                // padding: "20px",
                // margin: "10px auto",
                // maxWidth: "100rem",
              }
            }
          >
            <form
              onSubmit={handleCompleted}
              className="flex flex-col p-2 w-full"
            >
              <h2 className="text-xl font-bold text-white text-center">
                Confirm transaction
              </h2>
              <label
                htmlFor="txhash"
                className="font-semibold text-white pt-10"
              >
                Paste your transaction hash:{" "}
              </label>
              <input
                type="text"
                id="txhash"
                placeholder="Transaction Hash"
                required
                className="rounded p-2 w-full"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
              />
              <button
                className="px-10 text-center"
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#008000",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        );

      default:
        break;
    }
  };

  const UpgradeTabDetails = ({ planName, usdPrice }) => {
    return (
      <div className="bg-neutral-900 w-[300px] min-h-[220px] p-1 rounded flex flex-col pb-6">
        <div className="w-full flex flex-col items-center justify-between">
          <p className="text-neutral-500 text-xl font-semibold mt-4">
            {planName}
          </p>
          <p className="text-gray-100 mt-4 font-bold text-3xl">
            ${usdPrice} <span className="text-xl"> /month</span>
          </p>

          {
            <button
              onClick={() => {
                setPlan(planName);
                paymentRequest(usdPrice);
              }}
              className="text-black font-semibold px-10 py-3 mb-2 bg-neutral-200 rounded mt-10 hover:bg-neutral-300 text-center"
            >
              {currentUser?.accountType.bronze ||
              currentUser?.accountType.silver ||
              currentUser?.accountType.gold
                ? "Renew"
                : "Upgrade"}
            </button>
          }
        </div>
      </div>
    );
  };

  const PaymentTab = ({ src, amount, address, coinName }) => {
    return (
      <div className="max-w-5xl flex items-center justify-center">
        <div
          className="flex flex-col mx-auto max-w-xl"
          style={{
            padding: "0, 20px, 0",
          }}
        >
          <p className="font-semibold text-xl text-center">
            SEND {amount}
            {` ${coinName} `}TO THE WALLET ADDRESS BELOW OR SCAN THE QR CODE
            WITH YOUR WALLET APP
          </p>
          {/* <CountdownTimer /> */}
          <div className="mx-auto p-2">
            <Image src={src} alt={address} width={100} height={100} />
          </div>
          <div className="flex flex-col">
            <button
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "blue",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => copyAddress()}
            >
              Click to copy wallet address
            </button>
            <button
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#008000",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => setConfirm("confirm payment")}
            >
              confirm payment
            </button>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchBtcRate = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const data = await response.json();
        setBtcRate(data.bpi.USD.rate_float);
      } catch (error) {
        console.error("Error fetching BTC rate:", error);
      }
    };

    fetchBtcRate();
  }, []);

  return (
    <section className="max-w-5xl mx-auto pt-10">
      <div className="bg-neutral-900 p-2 rounded max-w-xl mx-auto">
        <p className="text-white text-xl font-bold text-center">
          <span className="font-normal">current status: </span>
          {currentUser?.accountType?.starter && "starter"}
          {currentUser?.accountType?.gold && "Gold"}
          {currentUser?.accountType?.silver && "Silver"}
          {currentUser?.accountType?.bronze && "Bronze"}
        </p>
      </div>
      {purchase()}
    </section>
  );
};
export default UpgradeDash;
