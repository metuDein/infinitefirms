"use client";
import TradingViewMiniWidget from "@component/tradingviewwidget/TradingViewMiniWidget";
import {
  IconCurrencyBitcoin,
  IconCurrencyEthereum,
  IconCurrencyMonero,
  IconCurrencyLitecoin,
  IconCurrencyXrp,
  IconBrandZulip,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useDataContext } from "@component/context/DataProvider";
import { useState, useEffect } from "react";

const MiningDash = () => {
  const {
    currentUser,
    allSubscription,
    btcRate,
    ethRate,
    ltcRate,
    xmrRate,
    xrpRate,
    zecRate,
  } = useDataContext();
  // const { balances } = currentUser;
  // const [btcRate, setBtcRate] = useState(null);
  // const [ethRate, setEthRate] = useState(null);
  // const [ltcRate, setLtcRate] = useState(null);
  // const [xmrRate, setXmrRate] = useState(null);
  // const [xrpRate, setXrpRate] = useState(null);
  // const [zecRate, setZecRate] = useState(null);

  const mySubs = allSubscription.filter(
    (item) => item?.userId?._id === currentUser?._id
  );

  const activeSubs = mySubs.filter(
    (item) => (item?.instruments).includes("Mining") && item.status === "active"
  );

  const handleCalculateCrypto = (coinrate, amount) => {
    return (amount / coinrate).toFixed(7);
    if (coinrate && amount) {
    }
  };
  const handleCalculateUsdPrice = (coinrate, amount) => {
    return (amount * coinrate).toFixed(2);
    if (coinrate && amount) {
    }
  };

  const MiningCard = ({
    icon,
    symbol,
    cryptoValue,
    cashValue,
    chartSymbol,
  }) => {
    return (
      <div className="bg-neutral-900 w-[220px] min-h-[220px] p-1 rounded flex flex-col">
        <div className="w-full flex flex-col items-center justify-between">
          {icon}
          <p className="text-gray-100 text-xl">{`${cryptoValue} ${symbol}`}</p>
          <p className="text-gray-100 mt-4">${cashValue}</p>

          <Link
            href={"/user/profile/deposit/mining"}
            className="text-black font-semibold px-10 bg-neutral-200 rounded mt-4 hover:bg-neutral-300 text-center"
          >
            Select
          </Link>
        </div>
        {/* <TradingViewMiniWidget symbol={chartSymbol} /> */}
      </div>
    );
  };
  // useEffect(() => {
  //   const fetchCryptoRates = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,monero,ripple,zcash&vs_currencies=usd"
  //       );
  //       const data = await response.json();

  //       // Set the rates for each cryptocurrency in their respective state
  //       setBtcRate(data.bitcoin.usd);
  //       setEthRate(data.ethereum.usd);
  //       setLtcRate(data.litecoin.usd);
  //       setXmrRate(data.monero.usd);
  //       setXrpRate(data.ripple.usd);
  //       setZecRate(data.zcash.usd);
  //     } catch (error) {
  //       console.error("Error fetching crypto rates:", error);
  //     }
  //   };

  //   fetchCryptoRates();
  // }, []);

  return (
    <section className="max-w-5xl mx-auto min-h-screen pt-20 sm:pt-4">
      <h2 className="text-center text-black text-4xl font-sans font-bold">
        {" "}
        Mining Dashboard{" "}
      </h2>
      <div className="flex flex-wrap justify-center gap-2 items-center h-full mt-10">
        <MiningCard
          icon={<IconCurrencyBitcoin className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.bitcoin).toFixed(4)}
          chartSymbol={"BITSTAMP:BTCUSD"}
          symbol="BTC"
          cashValue={handleCalculateUsdPrice(
            btcRate,
            currentUser?.balances?.bitcoin
          )}
        />
        <MiningCard
          icon={<IconCurrencyEthereum className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.ethereum).toFixed(5)}
          chartSymbol={"COINBASE:ETHUSD"}
          symbol="ETH"
          cashValue={handleCalculateUsdPrice(
            ethRate,
            currentUser?.balances?.ethereum
          )}
        />
        <MiningCard
          icon={<IconCurrencyLitecoin className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.litecoin).toFixed(2)}
          chartSymbol={"BINANCE:LTCUSD.P"}
          symbol="LTC"
          cashValue={handleCalculateUsdPrice(
            ltcRate,
            currentUser?.balances?.litecoin
          )}
        />
        <MiningCard
          icon={<IconCurrencyMonero className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.monero).toFixed(3)}
          chartSymbol={"KRAKEN:XMRUSD"}
          symbol="XMR"
          cashValue={handleCalculateUsdPrice(
            xmrRate,
            currentUser?.balances?.monero
          )}
        />
        <MiningCard
          icon={<IconCurrencyXrp className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.ripple).toFixed(3)}
          chartSymbol={"BITSTAMP:XRPUSD"}
          symbol="XRP"
          cashValue={handleCalculateUsdPrice(
            xrpRate,
            currentUser?.balances?.ripple
          )}
        />
        <MiningCard
          icon={<IconBrandZulip className="text-neutral-100 mb-5" />}
          cryptoValue={(currentUser?.balances?.zcash).toFixed(3)}
          chartSymbol={"COINBASE:ZECUSD"}
          symbol="ZEC"
          cashValue={handleCalculateUsdPrice(
            zecRate,
            currentUser?.balances?.zcash
          )}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h2 className="text-center text-black text-4xl font-sans font-bold">
          {" "}
          Active Mining Subscriptions{" "}
        </h2>
        {activeSubs.map((item, i) => (
          <div
            className="max-w-md mx-auto text-white rounded-lg shadow-lg p-6 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGUwY3o3OHZlNWFheHJqZ3JiMjQzdzAyNmZ0ZzB2d2l6eW03enEyNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/godMk62fXqpgY/200.webp)",
              marginTop: "20px",
            }}
          >
            <div className=" p-4 rounded-lg" key={i}>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Mining Information
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-300">
                  Cryptocurrency:
                </span>
                <span className="text-lg font-bold"> {item?.instruments}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-300">
                  Daily Earnings:
                </span>
                <span className="text-lg font-bold">
                  {(item?.earning).toFixed(5)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-300">TH/s Rate:</span>
                <span className="text-lg font-bold">{item?.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default MiningDash;
