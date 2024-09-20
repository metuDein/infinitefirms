"use client";
import { useEffect, useState } from "react";
import { IconBrandTether, IconCurrencyBitcoin } from "@tabler/icons-react";
import { toast } from "react-toastify";
import CountdownTimer from "../mining/component/Counter";
import Image from "next/image";
import { useDataContext } from "@component/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

const TradingDeposit = () => {
  const { currentUser } = useDataContext();
  const [confirm, setConfirm] = useState("selectPlan");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [btcRate, setBtcRate] = useState(null);
  const [txAmount, setTxAmount] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [image, setImage] = useState({});

  const featuresLite = [
    "No fees",
    "1000 free trades",
    "25% ROI Investment",
    "5 - 10 Available   Pro Traders",
  ];

  const featuresPro = [
    "No fees",
    "10,000 free trades",
    "45% ROI Investment",
    "10 - 20 Available   Pro Traders",
  ];

  const featuresUltra = [
    "No fees",
    "Unlimited trades",
    "70% ROI Investment",
    "60 - 100 Available Pro Traders",
  ];

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
          txType: "Trading deposit",
          amount: txAmount,
          address: selectedAddress,
          txhash: txHash,
          image,
        }),
      });

      console.log(response);
      const data = await response.json();
      const { newTx } = data;

      if (response.ok) {
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
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process payment");
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

  const PlanFeatures = ({ features }) => {
    return features.map((feature, index) => (
      <div key={index} class="flex items-start justify-start gap-2 my-2">
        <div class="h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="tabler-icon tabler-icon-check h-3 w-3 [stroke-width:4px] text-gray-200"
          >
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
        </div>
        <div class="font-medium text-black text-sm dark:text-white">
          {feature}
        </div>
      </div>
    ));
  };

  const TradigngTabDetails = ({ planName, usdPrice, features }) => {
    return (
      <div className="bg-neutral-900 w-[300px] min-h-[220px] p-1 rounded flex flex-col pb-6">
        <div className="w-full flex flex-col items-center justify-between">
          <p className="text-neutral-500 text-xl font-semibold mt-4">
            {planName}
          </p>
          <p className="text-gray-100 mt-4 font-bold text-3xl">
            ${usdPrice} <span className="text-xl"> /month</span>
          </p>

          <button
            onClick={() => paymentRequest(usdPrice)}
            className="text-black font-semibold px-10 py-3 mb-2 bg-neutral-200 rounded mt-10 hover:bg-neutral-300 text-center"
          >
            Purchase
          </button>
          <PlanFeatures features={features} />
        </div>
        {/* <TradingViewMiniWidget symbol={chartSymbol} /> */}
      </div>
    );
  };
  const CustomDetails = ({ planName, icon, usdPrice, hashValue, crypto }) => {
    return (
      <div className="bg-neutral-900 w-[300px] min-h-[220px] p-1 rounded flex flex-col pb-6">
        <div className="w-full flex flex-col items-center justify-between">
          {icon}
          <p className="text-neutral-500 text-xl font-semibold mt-4 text-center">
            {planName}
            <p>Minimum is $200</p>
          </p>
          {/* <p className="text-white mt-10 font-bold text-4xl">${txAmount}</p> */}
          <p className=" mt-4 font-bold text-3xl">
            <span className="text-3xl text-white"> $</span>

            <input
              type="number"
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              className="w-[100px] bg-neutral-800 text-black  rounded "
              style={{
                width: "150px",
              }}
              min={200}
            />
          </p>

          <button
            onClick={() => {
              paymentRequest(txAmount);
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

  const TradingPlans = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center mt-10 mx-auto">
        <TradigngTabDetails
          planName={"Lite"}
          usdPrice={800}
          features={featuresLite}
        />
        <TradigngTabDetails
          planName={"Pro"}
          usdPrice={2400}
          features={featuresPro}
        />
        <TradigngTabDetails
          planName={"Ultra"}
          usdPrice={8000}
          features={featuresUltra}
        />
        <CustomDetails planName={"Custom plan"} usdPrice={200} />
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
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "usegwhpg");
    const file = e.target.files[0];

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

  const purchase = () => {
    switch (confirm) {
      case "selectPlan":
        return (
          <div className="flex flex-wrap justify-between items-center h-full mt-10">
            <TradingPlans />
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
              className="flex flex-col p-2 w-full "
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
                      width={70}
                      height={70}
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
                onChange={(e) => setTxHash(e.target.value)}
                value={txHash}
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

  return (
    <section className="max-w-5xl mx-auto pt-10">
      <h2 className="text-center text-black text-4xl font-sans font-bold mx-auto">
        Trading Plans
      </h2>
      {purchase()}
    </section>
  );
};
export default TradingDeposit;
