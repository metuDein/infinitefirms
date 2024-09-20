// TradingViewWidget.jsx
"use client";
import React, { useEffect, useRef, memo } from "react";

function TradingViewMiniChartWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    const container = document.querySelector(
      ".tradingview-widget-container__widget"
    );
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = ""; // Clean up on unmount
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: "300px", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "370px", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}

export default memo(TradingViewMiniChartWidget);
