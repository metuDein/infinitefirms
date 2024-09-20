"use client";
import React, { useEffect, useRef } from "react";

const TradingViewWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current && widgetRef.current.childElementCount === 0) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      });
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <div
        ref={widgetRef}
        className="tradingview-widget"
        style={
          {
            // paddingTop: "60px",
            // position: "fixed",
            // left: "0",
            // width: "100%",
            // zIndex: "1000",
          }
        }
      ></div>
    </>
  );
};

export default TradingViewWidget;
