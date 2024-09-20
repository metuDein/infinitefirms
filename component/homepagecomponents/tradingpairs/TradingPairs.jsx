const TradingPairs = () => {
  const Pairs = () => (
    <div className="flex flex-col items-center gap-2 border rounded-md px-3 border-gray-500 self-center basis-1/4 bg-gray-200 mx-3">
      <p className="text-center text-gray-800"> FOREX </p>
      <span className="text-center">
        Foreign Exchange Market, a global decentralized market for the trading
        of currencies.
      </span>
    </div>
  );

  return (
    <div className="flex justify-between mx-auto max-w-4xl py-3 space-x-5 ">
      <Pairs />
      <Pairs />
      <Pairs />
      <Pairs />
    </div>
  );
};
export default TradingPairs;
