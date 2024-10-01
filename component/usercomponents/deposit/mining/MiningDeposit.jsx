"use client";
import { useState, useEffect } from "react";
import DropdownCrypto from "./component/DropdownCrypto";
import {
  IconCurrencyBitcoin,
  IconCurrencyEthereum,
  IconCurrencyMonero,
  IconCurrencyLitecoin,
  IconCurrencyXrp,
  IconBrandZulip,
  IconBrandTether,
} from "@tabler/icons-react";
import Image from "next/image";
import { toast } from "react-toastify";
import CountdownTimer from "./component/Counter";
import { useDataContext } from "@component/context/DataProvider";
import axios from "axios";
// import { Image } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

const MiningDeposit = () => {
  const [miningPlan, setMiningPlan] = useState("");
  const [hashRate, setHashRate] = useState(0);
  const [txType, setTxtype] = useState("");
  const [cryptocoin, setCryptocoin] = useState("");
  const { currentUser, btcRate, ethRate, ltcRate, xmrRate, xrpRate, zecRate } =
    useDataContext();
  const crypto = [
    "Bitcoin Plan",
    "Ethereum Plan",
    "Litecoin Plan",
    "Monero Plan",
    "Ripple Plan",
    "Zcash Plan",
  ];
  const cryptoRates = {
    btc: 0.000007, // BTC per TH/s per day
    eth: 0.0001, // ETH per TH/s per day
    ltc: 0.00002, // LTC per TH/s per day
    xmr: 0.0004, // XMR per TH/s per day
    xrp: 0.00005, // XRP per TH/s per day
    zec: 0.00003, // ZEC per TH/s per day
    // Add other coins as needed
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
    litecoin: {
      address: "ltc1qtwe325wn4dnxthm8szl50dyhfh0kx0zsz7ethy",
      src: "/assets/wallets/ltc.jpg",
    },
    ripple: {
      address: "rEvtLMr5m7RRvPAYnTRKT1ZNhDNFkBAMx2",
      src: "/assets/wallets/xrp.jpg",
    },
    zcash: {
      address: "t1QfjbLw7gvjkiZDAn1Pnq1YAnw1UgVnTSt",
      src: "/assets/zec.jpg",
    },
  };

  const [confirm, setConfirm] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [txAmount, setTxAmount] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [customUsd, setCustomUsd] = useState(0);
  const [image, setImage] = useState({});
  const [customHash, setCustomHash] = useState(1);

  const btcOneThs = 25;
  const ethOneThs = 23;
  const ltcOneThs = 30;
  const xmrOneThs = 20;
  const xrpOneThs = 25;
  const zecOneThs = 31;

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

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAddress);
    toast.success("Address copied successfully", {
      position: "top-center",
    });
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/deposits", {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser._id,
          txType: "mining deposit",
          amount: txAmount,
          address: selectedAddress,
          txhash: txHash,
          image,
        }),
      });

      const data = await response.json();
      console.log(data);

      const { newTx } = data;

      if (response.ok) {
        console.log(hashRate);

        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify({
            userId: currentUser?._id,
            instruments: `${cryptocoin} Mining`,
            price: hashRate,
            transId: newTx._id,
            earning: 0.03,
          }),
        });
        await fetch("/api/mails/adminalert", {
          method: "POST",
          body: JSON.stringify({
            body: `${currentUser?.firstname} ${currentUser?.lastname} has made a deposit of ${txAmount} USD please head over to the admin panel to review the transaction hash and approve the transaction`,
          }),
        });
        toast.success("Deposit request successful waiting for approval");

        // setConfirm(null);
        // setTxAmount(0);
        // setSelectedAddress("");
      } else {
        toast.error("Failed to deposit", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process payment", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "usegwhpg");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dxrxrbo8c/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      console.log(result);

      setImage({
        secure_url: result?.secure_url,
        public_id: result?.public_id,
      });
      toast("image uploaded");
    } catch (error) {
      toast.error("Error uploading image", {
        position: "top-center",
      });
    }
  };

  const minitab = () => {
    switch (miningPlan) {
      case "Bitcoin Plan":
        return btcTab();

      case "Ethereum Plan":
        return ethTab();

      case "Litecoin Plan":
        return ltcTab();

      case "Monero Plan":
        return xmrTab();

      case "Ripple Plan":
        return xrpTab();

      case "Zcash Plan":
        return zecTab();

      default:
        break;
    }
  };

  const btcPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconCurrencyBitcoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 500,
      hashValue: 20,
    },
    {
      name: "Pro plan",
      icon: <IconCurrencyBitcoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 3500,
      hashValue: 140,
    },
    {
      name: "Ultimate plan",
      icon: <IconCurrencyBitcoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 7000,
      hashValue: 280,
    },
  ];
  const ethPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconCurrencyEthereum className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 350,
      hashValue: 15,
    },
    {
      name: "Pro plan",
      icon: <IconCurrencyEthereum className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 1000,
      hashValue: 44,
    },
    {
      name: "Ultimate plan",
      icon: <IconCurrencyEthereum className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 3500,
      hashValue: 150,
    },
  ];
  const ltcPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconCurrencyLitecoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 300,
      hashValue: 10,
    },
    {
      name: "Pro plan",
      icon: <IconCurrencyLitecoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 900,
      hashValue: 30,
    },
    {
      name: "Ultimate plan",
      icon: <IconCurrencyLitecoin className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 2700,
      hashValue: 90,
    },
  ];
  const xmrPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconCurrencyMonero className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 400,
      hashValue: 20,
    },
    {
      name: "Pro plan",
      icon: <IconCurrencyMonero className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 1200,
      hashValue: 60,
    },
    {
      name: "Ultimate plan",
      icon: <IconCurrencyMonero className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 3600,
      hashValue: 180,
    },
  ];
  const xrpPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconCurrencyXrp className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 300,
      hashValue: 12,
    },
    {
      name: "Pro plan",
      icon: <IconCurrencyXrp className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 1000,
      hashValue: 40,
    },
    {
      name: "Ultimate plan",
      icon: <IconCurrencyXrp className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 3000,
      hashValue: 120,
    },
  ];
  const zecPlanDetails = [
    {
      name: "Beginner plan",
      icon: <IconBrandZulip className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 250,
      hashValue: 8,
    },
    {
      name: "Pro plan",
      icon: <IconBrandZulip className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 750,
      hashValue: 24,
    },
    {
      name: "Ultimate plan",
      icon: <IconBrandZulip className="text-neutral-100 mb-5 mt-2" />,
      usdPrice: 3000,
      hashValue: 96,
    },
  ];

  const btcTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {btcPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
            crypto={"btc"}
          />
        ))}
        <CustomDetails
          crypto={"btc"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const ethTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {ethPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
          />
        ))}
        <CustomDetails
          crypto={"eth"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const ltcTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {ltcPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
            crypto={"ltc"}
          />
        ))}
        <CustomDetails
          crypto={"ltc"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const xmrTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {xmrPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
            crypto={"xmr"}
          />
        ))}
        <CustomDetails
          crypto={"xmr"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const xrpTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {xrpPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
            crypto={"xrp"}
          />
        ))}
        <CustomDetails
          crypto={"xrp"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const zecTab = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto">
        {zecPlanDetails.map((plan, index) => (
          <MiningTabDetails
            key={index}
            planName={plan.name}
            icon={plan.icon}
            usdPrice={plan.usdPrice}
            hashValue={plan.hashValue}
            crypto={"zec"}
          />
        ))}
        <CustomDetails
          crypto={"zec"}
          planName={"Custom plan"}
          setHashRate={setHashRate}
          hashRate={hashRate}
          customUsd={customUsd}
          setCustomUsd={setCustomUsd}
        />
      </div>
    );
  };

  const MiningTabDetails = ({
    planName,
    icon,
    usdPrice,
    hashValue,
    crypto,
  }) => {
    return (
      <div className="bg-neutral-900 w-[300px] min-h-[220px] p-1 rounded flex flex-col pb-6">
        <div className="w-full flex flex-col items-center justify-between">
          {icon}
          <p className="text-neutral-500 text-xl font-semibold mt-4">
            {planName}
          </p>
          <p className="text-gray-100 mt-4 font-bold text-3xl">
            ${usdPrice} <span className="text-xl"> /month</span>
          </p>

          <p className="text-white mt-10 font-bold text-4xl">
            {hashValue} TH/s
          </p>
          <p className="text-neutral-500 mt-4 font-serif">
            SHA-256 Mining Algorithm <br />
            Maintenance Fees Apply
          </p>

          <button
            onClick={() => {
              setCryptocoin(crypto);
              setHashRate(hashValue);
              paymentRequest(usdPrice);
            }}
            className="text-black font-semibold px-10 py-3 mb-5 bg-neutral-200 rounded mt-10 hover:bg-neutral-300 text-center"
          >
            Purchase
          </button>
        </div>
        {/* <TradingViewMiniWidget symbol={chartSymbol} /> */}
      </div>
    );
  };

  const CustomDetails = ({
    planName,
    icon,
    usdPrice,
    hashValue,
    crypto,
    setHashRate,
    hashRate,
    customUsd,
    setCustomUsd,
  }) => {
    const handleCustomPrice = (crypto) => {
      if (crypto === "btc") {
        setCustomUsd(hashRate * btcOneThs);
      } else if (crypto === "eth") {
        setCustomUsd(hashRate * ethOneThs);
      } else if (crypto === "ltc") {
        setCustomUsd(hashRate * ltcOneThs);
      } else if (crypto === "xmr") {
        setCustomUsd(hashRate * xmrOneThs);
      } else if (crypto === "xrp") {
        setCustomUsd(hashRate * xrpOneThs);
      } else if (crypto === "zec") {
        setCustomUsd(hashRate * zecOneThs);
      }
    };
    useEffect(() => {
      handleCustomPrice(crypto);
    }, [hashRate]);

    return (
      <div className="bg-neutral-900 w-[300px] min-h-[220px] p-1 rounded flex flex-col pb-6">
        <div className="w-full flex flex-col items-center justify-between">
          {icon}
          <p className="text-neutral-500 text-xl font-semibold mt-4 text-center">
            {planName}
            <p>Minimum is $200</p>
          </p>
          <p className="text-white mt-10 font-bold text-4xl">
            ${customUsd} <span className="text-xl"> /month</span>
          </p>
          <p className=" mt-4 font-bold text-3xl">
            <input
              type="number"
              onChange={(e) => setHashRate(e.target.value)}
              value={hashRate}
              className="w-[100px] bg-neutral-800 text-black  rounded "
              style={{
                width: "150px",
              }}
              min={11}
            />
          </p>

          <p className="text-neutral-500 mt-4 font-serif">
            SHA-256 Mining Algorithm <br />
            Maintenance Fees Apply
          </p>

          <button
            onClick={() => {
              setCryptocoin(crypto);
              // setHashRate(hashValue);
              paymentRequest(customUsd);
            }}
            className="text-black font-semibold px-10 py-3 mb-5 bg-neutral-200 rounded mt-10 hover:bg-neutral-300 text-center"
          >
            Purchase
          </button>
        </div>
        {/* <TradingViewMiniWidget symbol={chartSymbol} /> */}
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

  const purchase = () => {
    switch (confirm) {
      case "selectPlan":
        return (
          <div className="flex flex-wrap justify-between items-center h-full mt-10">
            {minitab()}
          </div>
        );
      case "payment method":
        return (
          <>
            <h2 className="text-black pt-10 text-center font-bold text-2xl">
              Select a deposit method
            </h2>
            <div
              className="flex flex-wrap items-center h-full mt-10 gap-2 mx-auto justify-center"
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
            className="max-w-2xl bg-neutral-900 pt-10 mx-auto"
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
              <label htmlFor="tximg" className="text-white font-bold mt-2">
                {!image?.secure_url && (
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      className="text-white text-6xl"
                    />
                    <p>click to upload proof of transaction </p>
                  </div>
                )}
                {image?.secure_url && (
                  <div
                    className="w-[300px] h-[300px] overflow-hidden rounded-lg"
                    style={{
                      width: "300px",
                      height: "200px",
                    }}
                  >
                    <Image
                      src={image?.secure_url}
                      alt="Transaction Image"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="tximg"
                  className="hidden"
                  onChange={uploadImage}
                />
              </label>
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

  // useEffect(() => {
  //   const fetchBtcRate = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
  //       );
  //       const data = await response.json();
  //       setBtcRate(data.bpi.USD.rate_float);
  //     } catch (error) {
  //       console.error("Error fetching BTC rate:", error);
  //     }
  //   };

  //   fetchBtcRate();
  // }, []);

  const handleCalculate = (amount) => {
    if (btcRate && amount) {
      return (amount / btcRate).toFixed(7);
    }
  };
  return (
    <section className="max-w-5xl mx-auto flex flex-col pt-10">
      {confirm === "selectPlan" ||
        (confirm === null && (
          <div
            className="mt-10 mx-auto"
            onClick={() => setConfirm("selectPlan")}
          >
            <DropdownCrypto crypto={crypto} setMiningPlan={setMiningPlan} />
          </div>
        ))}
      {purchase()}
    </section>
  );
};
export default MiningDeposit;
