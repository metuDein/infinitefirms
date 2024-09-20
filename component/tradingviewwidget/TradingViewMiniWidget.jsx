import { useEffect, useRef } from "react";

const TradingViewMiniWidget = ({ symbol }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current && widgetRef.current.childElementCount === 0) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: "150",
        height: 150,
        locale: "en",
        dateRange: "12M",
        colorTheme: "dark",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
      });
      widgetRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container mt-4">
      <div
        ref={widgetRef}
        className="tradingview-widget-container__widget"
      ></div>
    </div>
  );
};

export default TradingViewMiniWidget;
