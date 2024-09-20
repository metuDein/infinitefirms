const AcctType = ({ title, accountStatus }) => {
  return (
    <div className="rounded-md w-fulla flex flex-col gap-2">
      <div className="rounded-full mx-auto border-b-2">
        <span className="text-gray-50 font-bold text-2xl">{title}</span>
      </div>
      <div className="mx-auto w-full">
        <p className="text-md text-white text-center text-nowrap w-full text-semibold">
          <br />
          {accountStatus}
        </p>
      </div>
    </div>
  );
};
export default AcctType;
