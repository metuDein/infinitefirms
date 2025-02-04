"use client";
import { ExpandableCardDemo } from "./profile/components/TransactionTab";
import { useEffect, useState } from "react";
import { useDataContext } from "@component/context/DataProvider";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faSpinner } from "@node_modules/@fortawesome/free-solid-svg-icons";
import { useRouter } from "@node_modules/next/navigation";

const Withdrawal = () => {
  const router = useRouter();
  const {
    currentUser,
    allTransactions,
    btcRate,
    ethRate,
    ltcRate,
    xmrRate,
    xrpRate,
    zecRate,
  } = useDataContext();

  const totalCryptoBalance =
    currentUser?.balances.bitcoin * btcRate +
    currentUser?.balances.ethereum * ethRate +
    currentUser?.balances.litecoin * ltcRate +
    currentUser?.balances.monero * xmrRate +
    currentUser?.balances.ripple * xrpRate +
    currentUser?.balances.zcash * zecRate;

  const [mining, setMining] = useState(totalCryptoBalance);
  const [key, setKey] = useState("Bitcoin");
  const [amount, setAmount] = useState(0);
  const [wallet, setWallet] = useState("");
  const [paypal, setpaypal] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [withdrawBal, setWithdrawaBal] = useState("");
  const [withdrawFrom, setWithdrawFrom] = useState("");

  const tx = allTransactions?.filter(
    (tx) => tx.userId?._id === currentUser?._id
  );

  const withdrawTx = tx.filter((item) => item.transtype.includes("withdraw"));

  const [withdrawalMsg, setWithdrawalMsg] = useState(
    "Processing Withdrawal Please hold."
  );
  const [withdrawTab1, setWithdrawTab1] = useState(false);
  const [withdrawTab2, setWithdrawTab2] = useState(false);

  useEffect(() => {
    const withdrawMsg = () => {
      setTimeout(() => {
        setWithdrawalMsg("Processing Withdrawal Please hold.");
      }, 3000);
      setTimeout(() => {
        setWithdrawalMsg("Checking Withdrawal fees Please hold.");
      }, 5000);
      setTimeout(() => {
        setWithdrawalMsg(
          `Withdrawal fee to complete processing is: $${currentUser?.balances?.withdrawalfee} usd`
        );
      }, 15000);
    };
    if (withdrawTab2) {
      withdrawMsg();
    }
  }, [withdrawTab2]);

  const handleWithdrawalbal = (e) => {
    setWithdrawaBal(e.target.value);
  };

  const activateWithdrawal = (e) => {
    e.preventDefault();
    setWithdrawTab2(true);
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (withdrawBal === "trading" && amount > currentUser?.balances?.trading) {
      toast.error("Insufficient balance", {
        position: "top-center",
      });
      return;
    }
    if (withdrawBal === "mining" && amount > totalCryptoBalance) {
      toast.error("Insufficient balance", {
        position: "top-center",
      });
      return;
    }

    switch (key) {
      case "Bitcoin":
        try {
          const response = await fetch("/api/deposits", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser?._id,
              amount: amount,
              address: wallet,
              txType: "bitcoin withdrawal",
              txhash: "withdrawal requests",
            }),
          });
          if (response.ok) {
            toast.success("Withdrawal request sent successfully", {
              position: "top-center",
            });
            setWithdrawTab2(false);
          }
        } catch (error) {
          toast.error("Failed to send withdrawal request", {
            position: "top-center",
          });
        }

        break;
      case "Ethereum":
        try {
          const response = await fetch("/api/deposits", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser?._id,
              amount: amount,
              address: wallet,
              txType: "Ethereum withdrawal",
              txhash: "withdrawal requests",
            }),
          });
          if (response.ok) {
            toast.success("Withdrawal request sent successfully", {
              position: "top-center",
            });
            setWithdrawTab2(false);
          }
        } catch (error) {
          toast.error("Failed to send withdrawal request", {
            position: "top-center",
          });
        }

        break;
      case "Paypal":
        try {
          const response = await fetch("/api/deposits", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser?._id,
              amount: amount,
              address: paypal,
              txType: "paypal withdrawal",
              txhash: "withdrawal requests",
            }),
          });
          if (response.ok) {
            toast.success("Withdrawal request sent successfully", {
              position: "top-center",
            });
            setWithdrawTab2(false);
          }
        } catch (error) {
          toast.error("Failed to send withdrawal request", {
            position: "top-center",
          });
        }

        break;

      case "Bank transfer":
        try {
          const response = await fetch("/api/deposits", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser?._id,
              amount: amount,
              address: `${bankName} ${bankAccountName} ${accountNumber}, ${bankRoutingNumber}`,
              txType: "Bank withdrawal",
              txhash: "withdrawal requests",
            }),
          });
          if (response.ok) {
            toast.success("Withdrawal request sent successfully", {
              position: "top-center",
            });
            setWithdrawTab2(false);
          }
        } catch (error) {
          toast.error("Failed to send withdrawal request", {
            position: "top-center",
          });
        }

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(key);
  }, [key]);

  const balancesOption = () => {
    Object.keys(currentUser?.balances).map((bal, i) => (
      <option value={bal} key={1}>
        {bal} : {currentUser?.balances[bal]}
      </option>
    ));
  };

  const addressOrAccount = () => {
    switch (key) {
      case "Bitcoin":
        return (
          <div className="pt-4">
            <label htmlFor="btc" className="text-white font-semibold pt-4">
              Wallet Address :
            </label>
            <input
              type="text"
              className="w-full rounded p-2 text-black placeholder:text-gray-500"
              placeholder="Wallet Address"
              id="btc"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        );
      case "Ethereum":
        return (
          <div className="pt-4">
            <label htmlFor="eth" className="text-white font-semibold pt-4">
              Wallet Address :
            </label>
            <input
              type="text"
              className="w-full rounded p-2 text-black placeholder:text-gray-500"
              placeholder="Wallet Address"
              id="eth"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        );
      case "Paypal":
        return (
          <div className="pt-4">
            <label htmlFor="paypal" className="text-white font-semibold pt-4">
              PayPal Email :
            </label>
            <input
              type="text"
              className="w-full rounded p-2 text-black placeholder:text-gray-500"
              placeholder="PayPal Email"
              id="paypal"
              value={paypal}
              onChange={(e) => setpaypal(e.target.value)}
            />
          </div>
        );
      case "Bank transfer":
        return (
          <div className="pt-4">
            <div className="mt-2">
              <label
                htmlFor="bank name"
                className="text-white font-semibold pt-4"
              >
                Bank Name :
              </label>
              <input
                type="text"
                className="w-full rounded p-2 text-black placeholder:text-gray-500"
                placeholder="Bank Name"
                id="bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="account name"
                className="text-white font-semibold pt-4"
              >
                Account Name :
              </label>
              <input
                type="text"
                className="w-full rounded p-2 text-black placeholder:text-gray-500"
                placeholder="Account Name"
                id="account name"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="account number"
                className="text-white font-semibold pt-4"
              >
                Account Number :
              </label>
              <input
                type="text"
                className="w-full rounded p-2 text-black placeholder:text-gray-500"
                placeholder="Account Number"
                id="account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="routing number"
                className="text-white font-semibold pt-4"
              >
                Routing number or IBAN Number :
              </label>
              <input
                type="text"
                className="w-full rounded p-2 text-black placeholder:text-gray-500"
                placeholder="Rounting Number"
                id="routing number"
                value={bankRoutingNumber}
                onChange={(e) => setBankRoutingNumber(e.target.value)}
                required
              />
            </div>
          </div>
        );
    }
  };

  return (
    <section className="max-w-5xl mx-auto pt-10">
      <h2 className="text-3xl font-bold text-center">Withdrawal</h2>
      <div className="flex flex-col items-center justify-start gap-2 md:flex-row p-3 mt-2 w-full">
        <div
          className="border border-black p-2 border-solid rounded relative"
          style={{
            flexBasis: "50%",
          }}
        >
          {withdrawTab2 && (
            <div className="absolute w-[350px] h-[400px] bg-[#fff] p-3 text-center flex items-center flex-col justify-center shadow-2xl rounded-md text-black">
              <p>{withdrawalMsg}</p>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-5xl mt-2"
              />
              {withdrawalMsg ===
                `Withdrawal fee to complete processing is: $${currentUser?.balances?.withdrawalfee} usd` && (
                <div className="w-full mx-auto flex space-x-1 justify-center items-center mt-3">
                  {currentUser?.balances?.deposit >
                  currentUser?.balances?.withdrawalfee ? (
                    <button
                      onClick={handleWithdrawal}
                      className="rounded p-2 shadow-md bg-black text-white "
                    >
                      Pay now
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/user/profile/deposit")}
                      className="rounded p-2 shadow-md bg-black text-white "
                    >
                      Deposit
                    </button>
                  )}

                  <button
                    onClick={() => {
                      // setWithdrawTab1(false);
                      setWithdrawTab2(false);
                      setWithdrawalMsg("Processing Withdrawal Please hold.");
                    }}
                    className="rounded p-2 shadow-md bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
          <form
            onSubmit={activateWithdrawal}
            className="w-full bg-neutral-900 p-2 min-w-48 rounded"
          >
            <div className="pt-4">
              <label htmlFor="Method" className="text-white font-semibold mt-2">
                Withdrawal Method :
              </label>

              <select
                name="method"
                id="method"
                className="w-full p-2 rounded "
                onChange={(e) => setKey(e.target.value)}
              >
                <option value="Bitcoin" key="1">
                  Bitcoin
                </option>
                <option value="Ethereum" key="2">
                  Ethereum
                </option>
                <option value="Paypal" key="3">
                  Paypal
                </option>
                <option value="Bank transfer" key="4">
                  Bank Transfer
                </option>
              </select>
            </div>
            <div className="pt-4">
              <label htmlFor="from" className="text-white font-semibold mt-2">
                From :
              </label>

              <select
                name="from"
                id="from"
                className="w-full p-2 rounded "
                onChange={handleWithdrawalbal}
              >
                <option> --- select balance ---</option>
                <option value={`trading`} key="1">
                  Trading Profit (${currentUser?.balances.trading})
                </option>
                <option value={`mining`} key="2">
                  Mining Profit $({totalCryptoBalance.toFixed(2)})
                </option>
              </select>
            </div>
            <div className="pt-4">
              <label htmlFor="amount" className="text-white font-semibold pt-4">
                Amount <span className="text-gray-400">( USD ) </span> :
              </label>
              <input
                type="number"
                className="w-full rounded p-2 text-black placeholder:text-gray-500"
                placeholder="Amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={500}
                required
              />
            </div>
            {addressOrAccount()}
            <div className="mt-2">
              <button className="bg-gray-200 rounded px-10 py-4 text-center w-full font-semibold ">
                {" "}
                submit
              </button>
            </div>
          </form>
        </div>
        <div className="pl-2 flex flex-col justify-center mx-auto">
          <h3 className="text-xl font-semibold text-center">
            recent withdrawal
          </h3>
          <div className="pl-2 flex items-start justify-center">
            <ExpandableCardDemo tx={withdrawTx} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Withdrawal;
