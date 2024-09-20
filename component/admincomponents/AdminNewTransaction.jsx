"use client";
import { useDataContext } from "@component/context/DataProvider";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminNewTransaction = () => {
  const { allUsers } = useDataContext();
  const [addressUsed, setAddressUsed] = useState("");
  const [txType, setTxType] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("Bitcoin");
  const [depositMethod, setDepositMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [paypal, setpaypal] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [userId, setUserId] = useState("");

  const usersOption = () => {
    return allUsers.map((user, i) => (
      <option value={user?._id} key={i}>
        {user?.firstname}
      </option>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (txType) {
      case "withdraw":
        switch (withdrawMethod) {
          case "Bitcoin":
            try {
              const response = await fetch("/api/deposits", {
                method: "POST",
                body: JSON.stringify({
                  userId,
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
                  userId: userId,
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
                  userId: userId,
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
                  userId: userId,
                  amount: amount,
                  address: `Bank name:${bankName}, Account Name:${bankAccountName}, Account NUmber${accountNumber}, Routing Number${bankRoutingNumber}`,
                  txType: "Bank withdrawal",
                  txhash: "withdrawal requests",
                }),
              });
              if (response.ok) {
                toast.success("Withdrawal request sent successfully", {
                  position: "top-center",
                });
              }
            } catch (error) {
              toast.error("Failed to send withdrawal request", {
                position: "top-center",
              });
            }

            break;
        }

        break;
      case "deposit":
        try {
          const response = await fetch("/api/deposits", {
            method: "POST",
            body: JSON.stringify({
              userId,
              txType: depositMethod,
              amount: amount,
              address: addressUsed,
              txhash: "admin added this transaction",
            }),
          });

          console.log(response);
          const data = await response.json();

          if (response.ok) {
            toast.success("Deposit completed", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Failed to deposit", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to process payment", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

      default:
        break;
    }
  };

  return (
    <section className="pt-10 mx-auto max-w-xl md:max-w-4xl min-h-screen pb-10">
      <h2 className="text-3xl font-bold text-center text-black">
        Make a transaction
      </h2>
      <div className="mt-10 w-full">
        <form onSubmit={handleSubmit}>
          <div
            className="p-2 rounded bg-neutral-900 "
            style={{
              minHeight: "300px",
              padding: "20px",
            }}
          >
            <select
              name="users"
              id="users"
              className="text-black  rounded p-2 text-center max-w-1/2 my-2"
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
              }}
              required
              onChange={(e) => setUserId(e.target.value)}
            >
              <option className="max">
                {" "}
                --select a user to assign the transaction--{" "}
              </option>
              {usersOption()}
            </select>
            <div className="pt-4">
              <label htmlFor="Method" className="text-white font-semibold mt-2">
                Transaction type:
              </label>

              <select
                name="method"
                id="method"
                className="w-full p-2 rounded "
                onChange={(e) => setTxType(e.target.value)}
                required
                value={txType}
              >
                <option value="deposit" key="1">
                  Deposit
                </option>
                <option value="withdraw" key="2">
                  Withdrawal
                </option>
              </select>
            </div>
            {txType === "withdraw" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="Method"
                    className="text-white font-semibold mt-2"
                  >
                    Withdrawal Method :
                  </label>

                  <select
                    name="method"
                    id="method"
                    className="w-full p-2 rounded "
                    onChange={(e) => setWithdrawMethod(e.target.value)}
                    value={withdrawMethod}
                    required
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
                </div>{" "}
              </>
            )}
            {txType === "withdraw" && withdrawMethod === "Bitcoin" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="eth"
                    className="text-white font-semibold pt-4"
                  >
                    Wallet Address :
                  </label>
                  <input
                    type="text"
                    className="w-full rounded p-2 text-black placeholder:text-gray-500"
                    placeholder="Wallet Address"
                    id="eth"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    required
                  />
                </div>
              </>
            )}{" "}
            {txType === "withdraw" && withdrawMethod === "Ethereum" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="eth"
                    className="text-white font-semibold pt-4"
                  >
                    Wallet Address :
                  </label>
                  <input
                    type="text"
                    className="w-full rounded p-2 text-black placeholder:text-gray-500"
                    placeholder="Wallet Address"
                    id="eth"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    required
                  />
                </div>
              </>
            )}{" "}
            {txType === "withdraw" && withdrawMethod === "Paypal" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="paypal"
                    className="text-white font-semibold pt-4"
                  >
                    PayPal Email :
                  </label>
                  <input
                    type="text"
                    className="w-full rounded p-2 text-black placeholder:text-gray-500"
                    placeholder="PayPal Email"
                    id="paypal"
                    value={paypal}
                    onChange={(e) => setpaypal(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <>
              {txType === "withdraw" && withdrawMethod === "Bank transfer" && (
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
                      required
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
              )}
            </>
            {txType === "deposit" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="deposit method"
                    className="text-white font-semibold mt-2"
                  >
                    Deposit Method :
                  </label>

                  <select
                    name="deposit method"
                    id="deposit method"
                    className="w-full p-2 rounded "
                    onChange={(e) => setDepositMethod(e.target.value)}
                    required
                    value={depositMethod}
                  >
                    <option>Select deposit type</option>
                    <option value="trading deposit" key="1">
                      Trading deposit
                    </option>
                    <option value="mining deposit" key="2">
                      Mining deposit
                    </option>
                    <option value="upgrade" key="3">
                      upgrade deposit
                    </option>
                  </select>
                </div>{" "}
              </>
            )}
            {txType === "deposit" && (
              <>
                <div className="pt-4">
                  <label
                    htmlFor="wallet"
                    className="text-white font-semibold pt-4"
                  >
                    Deposit Address :
                  </label>
                  <input
                    type="text"
                    className="w-full rounded p-2 text-black placeholder:text-gray-500"
                    placeholder="Deposit Address"
                    id="wallet"
                    value={addressUsed}
                    onChange={(e) => setAddressUsed(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col">
              <label
                htmlFor="amount"
                className="font-semibold text-white"
                style={{
                  marginBottom: "5px",
                }}
              >
                Amount (USD):
              </label>
              <input
                type="number"
                id="amount"
                name="name"
                placeholder="Amount"
                className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <button
              className="bg-gray-100 text-black w-full mx-auto mt-4 font-bold"
              style={{
                padding: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "10px",
                background: "green",
                color: "white",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AdminNewTransaction;
