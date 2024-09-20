const Balance = ({ balance, expectedProfit, title, accountStatus }) => {
  return (
    <div className="rounded-md w-fulla flex flex-col gap-2">
      <div className="rounded-full mx-auto border-b-2">
        <span className="text-gray-50 font-bold text-2xl">{title}</span>
      </div>
      <div className="mx-auto w-full">
        <p className="text-xl font-medium text-gray-100 text-center pb-3">
          {!title.includes("BTC") && (
            <span className="font-normal text-sm">$</span>
          )}
          {balance}
          {title.includes("BTC") ? (
            <span className="font-normal text-sm">BTC</span>
          ) : (
            <span className="font-normal text-sm">USD</span>
          )}
        </p>
      </div>
    </div>
  );
};
export default Balance;
